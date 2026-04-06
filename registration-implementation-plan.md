# Detailed Event Registration & Payment Implementation Guide

Welcome to the definitive, beginner-friendly guide for implementing the Event Registration and Razorpay payment flow in your Euphoria Fest project! 

The goal is to connect your frontend (React) to your backend (Express + Prisma) so a user can fill out their details, click pay, securely enter payment details in a Razorpay popup, and successfully register.

---

## Phase 1: Backend Fixes & Wiring

Your backend manages the database using Prisma and securely talks to Razorpay. We need to handle two things: creating an order (when the user clicks "Pay") and verifying an order (when Razorpay says the payment succeeds).

### Step 1.1: Make `createOrder` Dynamic

Currently, your `backend/src/controllers/order.controller.ts` is hardcoding test values. Let's make it read the data the user actually types into the frontend form.

**Open `backend/src/controllers/order.controller.ts` and replace `createOrder` with this:**

```typescript
export const createOrder = async (req: Request, res: Response) => {
    try {
        // 1. Extract the dynamic data sent from our React frontend
        const { name, email, phone, event_id, amount } = req.body;

        // 2. Create the Registration with a default PENDING status
        const registration = await prisma.registration.create({
            data: {
                name: name,
                email: email,
                phone: phone,
                event_id: String(event_id) // Ensure it's a string, matching your schema
            }
        });

        // 3. Create an Order in our local database linked to the Registration
        const order = await prisma.order.create({
            data: {
                amount: amount, 
                registration_id: registration.id
            }
        });

        // 4. Ask Razorpay to create an order on their end
        // Note: Razorpay expects the amount in the smallest currency sub-unit (paise). 
        // We multiply by 100. For example, ₹500 becomes 50000 paise.
        const razorpayOrder = await razorpay.orders.create({
            amount: amount * 100,
            currency: 'INR',
            receipt: order.id
        });

        // 5. Update our local Order with Razorpay's specific order ID
        await prisma.order.update({
            where: { id: order.id },
            data: {
                razorpay_order_id: razorpayOrder.id
            }
        });

        // 6. Send all these details back to the frontend so it can open the checkout popup
        res.status(200).json({
            razorpay_order_id: razorpayOrder.id, 
            order_id: order.id,
            amount: amount,
        });

    } catch (err) {
        logger.error("PAYMENT", "Error processing payment");
        console.error(err);
        res.status(400).send("Not able to create order. Please try again!");
    }
}
```

### Step 1.2: Implement Payment Verification

When Razorpay succeeds, any smart user could theoretically fake a success message. To prevent this, Razorpay sends a `signature`. We use our Secret Key to mathematically prove the signature is authentic.

**Add the `verifyPayment` function to the bottom of `backend/src/controllers/order.controller.ts`:**

```typescript
import crypto from "crypto";

export const verifyPayment = async (req: Request, res: Response) => {
    try {
        // 1. Extract details sent by Razorpay after successful payment
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id } = req.body;

        // 2. We use node's built-in `crypto` library to hash the order_id and payment_id 
        // with our RAZORPAY_KEY_SECRET to generate a secure signature.
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
            .update(body.toString())
            .digest("hex");

        // 3. Check if our generated signature matches the one Razorpay sent
        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // It's a valid payment! Let's update our database.
            
            // a. Save a record of the actual payment
            await prisma.payment.create({
                data: {
                    order_id: order_id, // our local order id
                    razorpay_payment_id: razorpay_payment_id,
                    razorpay_signature: razorpay_signature,
                    status: "SUCCESS"
                }
            });

            // b. Mark the Order as PAID
            const updatedOrder = await prisma.order.update({
                where: { id: order_id },
                data: { status: "PAID" }
            });

            // c. Mark the actual Registration as CONFIRMED
            await prisma.registration.update({
                where: { id: updatedOrder.registration_id },
                data: { status: "CONFIRMED" }
            });

            // d. Tell the frontend all is good!
            res.status(200).json({ success: true, message: "Payment verified successfully" });
        } else {
            res.status(400).json({ success: false, message: "Invalid signature" });
        }
    } catch (err) {
        logger.error("PAYMENT_VERIFY", "Error verifying payment signature");
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}
```

### Step 1.3: Expose the Verification Route

We created the logic, now our backend server needs a URL address where the frontend can actually reach it.

**Open `backend/src/routes/order.routes.ts` and update it like so:**

```typescript
import { Router } from "express";
import { createOrder, verifyPayment } from "../controllers/order.controller";

const router = Router();

// This route runs when user clicks "Pay" to create the initial pending order
router.post("/orders", createOrder);

// This route runs after Razorpay Checkout says "Success" to finalize everything
router.post("/verify", verifyPayment);

export default router;
```

---

## Phase 2: Frontend Form UI

Now we move to the React side to build the interface that your users will interact with.

### Step 2.1: Add Razorpay Checkout Library
Before anything, React needs access to Razorpay's code.

**Open `frontend/index.html` and add the script tag in the `<head>`:**
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/music-notes-logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- ADD THIS LINE: -->
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    <title>Euphoria</title>
  </head>
  <body>
    ...
```

### Step 2.2: Create the `RegistrationModal`

This component will be the pop-over showing form inputs for Name, Email, and Phone.

**Create a new file at `frontend/src/components/RegistrationModal.jsx` and copy this complete code:**

```jsx
import { useState } from "react";

export default function RegistrationModal({ event, onClose }) {
  // 1. Manage form details in State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);

  // 2. Simple function to update State when user types in inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. The magic function: Runs when user hits "Pay & Register"
  const handlePayment = async (e) => {
    e.preventDefault(); // Prevent page refresh
    setIsLoading(true);

    try {
      // --- A. CREATE ORDER ---
      // Send the user details to our express backend
      const orderResponse = await fetch("/api/v1/orders/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          event_id: event.id,
          amount: event.registration_amount || 500, // Make sure events have a cost, fallback to 500
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) throw new Error("Failed to create order");

      // --- B. OPEN RAZORPAY ---
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_YOUR_KEY_HERE", // Grab public key 
        amount: orderData.amount * 100, // Razorpay takes paise 
        currency: "INR",
        name: "Euphoria Fest",
        description: `Registration for ${event.title}`,
        order_id: orderData.razorpay_order_id, // Order ID generated safely from backend
        // --- C. HANDLE SUCCESS ---
        handler: async function (response) {
            // Razorpay gives us these 3 things on success:
            const verifyResponse = await fetch("/api/v1/orders/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                    order_id: orderData.order_id, // pass our local database order details too
                }),
            });

            const verifyResult = await verifyResponse.json();
            if (verifyResult.success) {
                alert("🎉 Registration Successful! See you at Euphoria.");
                onClose(); // Close the modal
            } else {
                alert("Payment Verification Failed. Contact Support.");
            }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#c05754", // Euphoria maroon theme color
        },
      };

      const rzp = new window.Razorpay(options);
      
      // If modal gets closed without paying
      rzp.on('payment.failed', function (response){
         alert("Payment Failed: " + response.error.description);
      });

      rzp.open();

    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1C0F0F] border border-[#c9a88a]/40 p-8 rounded-lg w-full max-w-md shadow-xl text-[#f5e6d3] relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>

        <h2 className="text-3xl font-[Bebas_Neue] text-center mb-2 tracking-widest">
           Register for {event.title}
        </h2>
        <p className="text-center font-[Dancing_Script] text-[#c05754] italic mb-6">
           Registration Fee: ₹{event.registration_amount || 500}
        </p>

        {/* The Form */}
        <form onSubmit={handlePayment} className="flex flex-col gap-4">
          <input
            required
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-black/50 border border-[#c9a88a]/40 p-3 rounded text-white outline-none focus:border-[#c05754]"
          />
          <input
            required
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="bg-black/50 border border-[#c9a88a]/40 p-3 rounded text-white outline-none focus:border-[#c05754]"
          />
          <input
            required
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="bg-black/50 border border-[#c9a88a]/40 p-3 rounded text-white outline-none focus:border-[#c05754]"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full bg-[#c05754] hover:bg-[#a04643] transition-colors py-3 rounded text-white font-bold tracking-wider disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Pay & Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
```

---

## Phase 3: Triggering the Form

Let's make sure the user can actually open this Modal when exploring events.

### Step 3.1: Add a Register Button in `EventRow.jsx`

1. Look in `frontend/src/components/EventRow.jsx` (Or if you haven't created it, wherever you render individual events on your page).
2. It should have a button like `<button onClick={onRegisterClick}>Register Now</button>`.

### Step 3.2: Render the Modal in `Events.jsx`

We keep track of whether the modal is open, and which event was selected.

**Open `frontend/src/pages/Events.jsx` and make these modifications:**

```jsx
// 1. Import your newly created modal component at the top
import RegistrationModal from "../components/RegistrationModal";

export default function Events() {
  // ... your existing state ...
  
  // 2. Add two new state variables
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 3. Helper function to open modal 
  // (You'd pass this down to <EventRow event={ev} onRegister={() => handleOpenModal(ev)} />)
  const handleOpenModal = (event) => {
      setSelectedEvent(event);
      setIsModalOpen(true);
  }

  // ....

  return (
    <div className="bg-[#1C0F0F] min-h-screen text-white px-6 py-10 relative">
      
      {/* .... All your existing JSX (Hero Section, Event Filters, etc) ....  */}
      
      {/* Pass the function into EventRow  (Note you will need to update EventRow.jsx to accept this prop!) */}
      {filtered.map((ev) => (
          <EventRow 
             key={ev.id} 
             event={ev} 
             onRegister={() => handleOpenModal(ev)} 
           />
      ))}

      {/* 4. Down at the very bottom, just before the final </div> tag, render the modal! */}
      {isModalOpen && selectedEvent && (
        <RegistrationModal 
            event={selectedEvent} 
            onClose={() => setIsModalOpen(false)} 
        />
      )}

    </div>
  )
}
```

### Reminders & Final Checks:
- Did you add your frontend API proxy? Since your backend runs on a different port (e.g. 5000) and frontend on Vite (5173), Vite needs a proxy in `vite.config.js` or `package.json` to proxy `/api/v1` to `http://localhost:5000`.
- Do you have `RAZORPAY_KEY_SECRET` in your backend `.env` file?
- Are your UI prices tied properly to backend expectations?

You now have a complete, secure registration system! Happy Coding! 🚀
