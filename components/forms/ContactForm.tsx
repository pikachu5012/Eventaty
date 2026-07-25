"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function ContactForm() {
    const t = useTranslations("Contact");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            toast.error("Please fill in all fields");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Message sent successfully!");
                setIsSuccess(true);
                // Reset form
                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                });
            } else {
                toast.error(data.error || "Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("An error occurred. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="p-8 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center space-y-4 my-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-2xl font-bold">
                    ✓
                </div>
                <h3 className="text-xl font-bold text-foreground">
                    {t("successTitle") || "Message Sent Successfully!"}
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    {t("successDesc") || "Thank you for reaching out to us. We have received your message and will get back to you within 24 hours."}
                </p>
                <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition-colors cursor-pointer text-sm"
                >
                    {t("sendAnother") || "Send Another Message"}
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-primary/80">
                        {t("nameLabel")}
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t("namePlaceholder")}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-eventaty-gold/20 outline-none transition-all placeholder:text-gray-400 text-primary"
                        disabled={isSubmitting}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-primary/80">
                        {t("emailLabel")}
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("emailPlaceholder")}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-eventaty-gold/20 outline-none transition-all placeholder:text-gray-400 text-primary"
                        disabled={isSubmitting}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-primary/80">
                    {t("subjectLabel")}
                </label>
                <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t("subjectPlaceholder")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-eventaty-gold/20 outline-none transition-all placeholder:text-gray-400 text-primary"
                    disabled={isSubmitting}
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-primary/80">
                    {t("messageLabel")}
                </label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder={t("messagePlaceholder")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-eventaty-gold/20 outline-none transition-all resize-none placeholder:text-gray-400 text-primary"
                    disabled={isSubmitting}
                />
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-4 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer"
                >
                    <Send size={20} />
                    {isSubmitting ? "Sending..." : t("sendButton")}
                </button>
                <p className="text-center text-xs text-muted-foreground mt-3 font-medium">
                    {t("responseTimeNotice") || "We typically respond within 24 hours."}
                </p>
            </div>
        </form>
    );
}
