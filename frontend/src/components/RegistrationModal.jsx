import { useState } from "react";
import { events as allEvents } from "../data/events";

export const RegistrationModal = ({ event, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        event_id: event ? event.id : ""
    });

    const currentEvent = allEvents.find(e => String(e.id) === String(formData.event_id)) || event;

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await fetch("/api/v1/orders/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    event_id: currentEvent.id,
                    amount: currentEvent.registration_amount || 500
                }),
            });

            const orderData = await response.json();

            if (!response.ok) throw new Error("Failed to create order");

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || "test",
                amount: orderData.amount * 100,
                currency: "INR",
                name: "Euphoria Fest",
                description: `Registration for ${currentEvent.title}`,
                order_id: orderData.razorpay_order_id,
                handler: async function (response) {
                    const verifyResponse = await fetch("/api/v1/orders/verify", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            order_id: orderData.order_id,
                        }),
                    });

                    const verifyResult = await verifyResponse.json();
                    if (verifyResult.success) {
                        alert("Registration Successful! See you at Euphoria.");
                        onClose();
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
                    color: "#c05754",
                },
            };

            const rzp = new window.Razorpay(options);

            rzp.on('payment.failed', function (response) {
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
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
                <div className="bg-[#1C0F0F] border border-[#c05754]/40 p-8 md:p-12 w-full max-w-[500px] shadow-[0_0_40px_rgba(192,87,84,0.15)] relative">

                    {/* Close Action */}
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-6 text-[#b69f88] hover:text-[#c05754] text-2xl transition-colors outline-none"
                    >
                        ✕
                    </button>

                    <h2 className="text-4xl md:text-5xl font-[Bebas_Neue] text-center mb-2 tracking-[0.1em] text-[#f5e6c8] uppercase">
                        Register <span className="text-[#c05754]">Now</span>
                    </h2>
                    <p className="text-center font-[Almendra] text-[#b69f88] tracking-wide mb-8 text-lg">
                        {currentEvent ? `${currentEvent.title} — ₹${currentEvent.registration_amount || 500}` : "Select an event below to view pricing"}
                    </p>

                    {/* The Form */}
                    <form onSubmit={handlePayment} className="space-y-8">
                        <div>
                            <label className="block font-[Bebas_Neue] text-lg tracking-[0.3em] text-[#b69f88] uppercase mb-1">
                                Select Event
                            </label>
                            <select
                                required
                                name="event_id"
                                value={formData.event_id}
                                onChange={handleChange}
                                className="ef-modal-input pb-3"
                            >
                                <option value="" disabled className="text-[#888] bg-[#1C0F0F]">-- Choose an Event --</option>
                                {allEvents.map((e) => (
                                    <option key={e.id} value={e.id} className="text-[#f5e6c8] bg-[#1C0F0F] font-sans">
                                        {e.title} — ₹{e.registration_amount || 500}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block font-[Bebas_Neue] text-lg tracking-[0.3em] text-[#b69f88] uppercase mb-1">
                                Full Name
                            </label>
                            <input
                                required
                                type="text"
                                name="name"
                                placeholder="Zeva Kreilen"
                                value={formData.name}
                                onChange={handleChange}
                                className="ef-modal-input"
                            />
                        </div>
                        <div>
                            <label className="block font-[Bebas_Neue] text-lg tracking-[0.3em] text-[#b69f88] uppercase mb-1">
                                Email Address
                            </label>
                            <input
                                required
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="ef-modal-input"
                            />
                        </div>
                        <div>
                            <label className="block font-[Bebas_Neue] text-lg tracking-[0.3em] text-[#b69f88] uppercase mb-1">
                                Phone Number
                            </label>
                            <input
                                required
                                type="tel"
                                name="phone"
                                placeholder="9876543210"
                                value={formData.phone}
                                onChange={handleChange}
                                className="ef-modal-input"
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="ef-modal-btn"
                            >
                                <span>{isLoading ? "Processing..." : "Pay & Register"}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}