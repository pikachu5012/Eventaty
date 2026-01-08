"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  X,
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit,
  Calendar as CalendarIcon,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IEvent } from "@/types/event";
import { IVenue } from "@/types/venue";
import { format } from "date-fns";

interface EventFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event?: IEvent;
  onSubmit: (data: any) => void;
  loading?: boolean;
  categories: Array<{ _id: string; name: string }>;
  venues: IVenue[];
}

type FormData = {
  title: string;
  description: string;
  images: string[];
  startDateTime: string;
  endDateTime: string;
  categoryId: string;
  venueId: string;
  totalCapacity: number; // Used for "available" or general capacity
  // We'll define venue location manually or just display from venue
  price: number;
  eventType: "In-person" | "Online" | "Hybrid";
  status: "draft" | "published" | "cancelled";
  featured: boolean;
  tickets: Array<{
    type: string;
    description: string;
    multiplier: number;
    availableQuantity?: number; // In case we want to support this field per ticket
  }>;
};

export function EventForm({
  open,
  onOpenChange,
  event,
  onSubmit,
  loading = false,
  categories = [],
  venues = [],
}: EventFormProps) {
  const defaultValues: FormData = {
    title: "",
    description: "",
    images: ["", ""], // Start with one or two empty slots?
    startDateTime: "",
    endDateTime: "",
    categoryId: "",
    venueId: "",
    totalCapacity: 0,
    price: 0,
    eventType: "In-person",
    status: "published",
    featured: false,
    tickets: [
      {
        type: "General Admission",
        description: "Standing room, main floor access",
        multiplier: 1,
      },
    ],
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: event
      ? {
          title: event.title,
          description: event.description,
          images: event.images || [""],
          startDateTime: event.startDateTime
            ? format(new Date(event.startDateTime), "yyyy-MM-dd'T'HH:mm")
            : "",
          endDateTime: event.endDateTime
            ? format(new Date(event.endDateTime), "yyyy-MM-dd'T'HH:mm")
            : "",
          categoryId:
            typeof event.categoryId === "object" &&
            event.categoryId !== null &&
            "_id" in event.categoryId
              ? event.categoryId._id
              : (event.categoryId as string) || "",
          venueId:
            typeof event.venueId === "object" &&
            event.venueId !== null &&
            "_id" in event.venueId
              ? event.venueId._id
              : (event.venueId as string) || "",
          totalCapacity: event.totalCapacity,
          price: event.price,
          eventType:
            (event.eventType as "In-person" | "Online" | "Hybrid") ||
            "In-person",
          status:
            (event.status as "draft" | "published" | "cancelled") || "draft",
          featured: event.featured,
          tickets:
            event.tickets && event.tickets.length > 0
              ? event.tickets.map((t) => ({
                  type: t.type,
                  description: t.description,
                  multiplier: t.multiplier,
                }))
              : defaultValues.tickets,
        }
      : defaultValues,
  });

  const [imageUrls, setImageUrls] = useState<string[]>([""]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    if (event?.images?.length) {
      setImageUrls(event.images);
      setImagePreviews(event.images);
    } else {
      setImageUrls([""]);
      setImagePreviews([]);
    }
  }, [event]);

  const handleAddImageUrl = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const handleRemoveImageUrl = (index: number) => {
    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    setImageUrls(newImageUrls);
    setValue(
      "images",
      newImageUrls.filter((url) => url)
    );

    const newImagePreviews = [...imagePreviews];
    newImagePreviews.splice(index, 1);
    setImagePreviews(newImagePreviews);
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
    setValue(
      "images",
      newImageUrls.filter((url) => url)
    );

    if (value.match(/\.(jpeg|jpg|gif|png|webp)$/i) != null) {
      const newImagePreviews = [...imagePreviews];
      newImagePreviews[index] = value;
      setImagePreviews(newImagePreviews);
    }
  };

  const handleAddTicket = () => {
    const currentTickets = watch("tickets") || [];
    setValue("tickets", [
      ...currentTickets,
      { type: "General", description: "", multiplier: 1 }, // Reset new ticket defaults
    ]);
  };

  const handleRemoveTicket = (index: number) => {
    const currentTickets = [...(watch("tickets") || [])];
    currentTickets.splice(index, 1);
    setValue("tickets", currentTickets);
  };

  const onFormSubmit = (data: FormData) => {
    const formattedData = {
      ...data,
      startDateTime: new Date(data.startDateTime),
      endDateTime: new Date(data.endDateTime),
      totalCapacity: Number(data.totalCapacity),
      price: Number(data.price),
      // Set availableSeats to totalCapacity for new events
      ...(!event ? { availableSeats: Number(data.totalCapacity) } : {}),
      tickets: data.tickets.map((ticket) => ({
        ...ticket,
        multiplier: Number(ticket.multiplier) || 1,
      })),
    };
    onSubmit(formattedData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl max-h-[90vh] flex flex-col bg-card rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-navFooter text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Edit className="h-5 w-5 text-eventaty-gold" />
            </div>
            <div>
              <h2 className="text-lg font-semibold leading-none">
                {event ? "Edit Event" : "Create Event"}
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                {event
                  ? "Update event information"
                  : "Add details for a new event"}
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-white transition-colors p-1 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          <form
            id="event-form"
            onSubmit={handleSubmit(onFormSubmit)}
            className="space-y-8"
          >
            {/* Image Section */}
            <div className="space-y-3">
              <Label className="text-xs font-semibold text-primary/50 uppercase tracking-wide">
                Event Image URL
              </Label>
              <div className="flex gap-4 items-start p-4 bg-background/50 border border-eventaty-gold/20 rounded-xl">
                <div className="w-24 h-24 shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center">
                  {imagePreviews[0] ? (
                    <img
                      src={imagePreviews[0]}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-gray-300" />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={imageUrls[0]}
                    onChange={(e) => handleImageUrlChange(0, e.target.value)}
                    className="bg-background border-gray-200 focus:border-eventaty-gold focus:ring-eventaty-gold/20"
                  />
                  <p className="text-[11px] text-primary/70">
                    Enter a valid Image URL. Preview will update automatically.
                  </p>
                </div>
              </div>
            </div>

            {/* Main Info */}
            <div className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-primary/70 text-sm">
                  Event Title
                </Label>
                <Input
                  id="title"
                  placeholder="e.g. Rock Concert: The Legends"
                  className="h-11 rounded-lg border-gray-200 focus:border-eventaty-gold focus:ring-eventaty-gold/20 font-medium bg-background"
                  {...register("title", { required: true })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Category */}
                <div className="space-y-2">
                  <Label className="text-primary/70 text-sm">Category</Label>
                  <Controller
                    name="categoryId"
                    control={control}
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          className={`h-11 rounded-lg border-gray-200 focus:ring-eventaty-gold/20 ${
                            errors.categoryId ? "border-red-500" : ""
                          }`}
                        >
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((c) => (
                            <SelectItem key={c._id} value={c._id}>
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.categoryId && (
                    <span className="text-xs text-red-500">
                      Category is required
                    </span>
                  )}
                </div>
                {/* Price */}
                <div className="space-y-2">
                  <Label className="text-primary/70 text-sm">
                    Base Price (EGP)
                  </Label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="h-11 rounded-lg border-gray-200 focus:border-eventaty-gold focus:ring-eventaty-gold/20 bg-background"
                    {...register("price", { required: true })}
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label className="text-primary/70 text-sm">
                    Start Date & Time
                  </Label>
                  <div className="relative">
                    <Input
                      type="datetime-local"
                      className="h-11 rounded-lg border-gray-200 focus:border-eventaty-gold focus:ring-eventaty-gold/20 pl-10 bg-background"
                      {...register("startDateTime", { required: true })}
                    />
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-primary/70 text-sm">
                    End Date & Time
                  </Label>
                  <div className="relative">
                    <Input
                      type="datetime-local"
                      className="h-11 rounded-lg border-gray-200 focus:border-eventaty-gold focus:ring-eventaty-gold/20 pl-10 bg-background"
                      {...register("endDateTime", { required: true })}
                    />
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Venue & Capacity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label className="text-primary/70 text-sm">Venue</Label>
                  <Controller
                    name="venueId"
                    control={control}
                    rules={{ required: "Venue is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          className={`h-11 rounded-lg border-gray-200 focus:ring-eventaty-gold/20 ${
                            errors.venueId ? "border-red-500" : ""
                          }`}
                        >
                          <SelectValue placeholder="Select Venue" />
                        </SelectTrigger>
                        <SelectContent>
                          {venues.map((v) => (
                            <SelectItem key={v._id} value={v._id}>
                              {v.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.venueId && (
                    <span className="text-xs text-red-500">
                      Venue is required
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-primary/70 text-sm">Capacity</Label>
                  <Input
                    type="number"
                    placeholder="Total seats"
                    className="h-11 rounded-lg border-gray-200 focus:border-eventaty-gold focus:ring-eventaty-gold/20 bg-background"
                    {...register("totalCapacity", { required: true })}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-primary/70 text-sm">Description</Label>
                <Textarea
                  placeholder="Event details..."
                  rows={4}
                  className="resize-none rounded-lg border-gray-200 focus:border-eventaty-gold focus:ring-eventaty-gold/20"
                  {...register("description")}
                />
              </div>

              {/* Featured Checkbox */}
              <div className="flex items-center space-x-3 pt-2">
                <Controller
                  name="featured"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="featured"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="h-5 w-5 border-gray-300 text-eventaty-gold data-[state=checked]:bg-eventaty-gold data-[state=checked]:border-eventaty-gold"
                    />
                  )}
                />
                <label
                  htmlFor="featured"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-primary/80"
                >
                  Mark as Featured Event
                </label>
              </div>
            </div>

            {/* Tickets Section */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                  Ticket Types
                </h3>
                <Button
                  type="button"
                  onClick={handleAddTicket}
                  size="sm"
                  className="bg-background text-eventaty-gold border border-eventaty-gold/30 hover:bg-eventaty-gold hover:text-white transition-all shadow-sm cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Ticket
                </Button>
              </div>

              <div className="grid gap-4">
                {watch("tickets")?.map((ticket, index) => (
                  <div
                    key={index}
                    className="group relative bg-background border border-transparent hover:border-eventaty-gold/30 rounded-xl p-5 transition-all"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold text-gray-400 uppercase">
                        Ticket #{index + 1}
                      </span>
                      {watch("tickets").length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveTicket(index)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-xs text-primary/50 mb-1.5 block">
                          Ticket Type Name
                        </Label>
                        <Controller
                          name={`tickets.${index}.type` as const}
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="h-10 bg-card border-gray-200">
                                <SelectValue placeholder="Select Type" />
                              </SelectTrigger>
                              <SelectContent>
                                {/* static */}
                                <SelectItem value="General">General</SelectItem>
                                <SelectItem value="VIP">VIP</SelectItem>
                                <SelectItem value="VIP Gold">VIP Gold</SelectItem>
                                <SelectItem value="VIP Platinum">VIP Platinum</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs text-primary/50 mb-1.5 block">
                            Multiplier (Price Factor)
                          </Label>
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="1.0"
                            className="h-10 bg-card border-gray-200"
                            {...register(
                              `tickets.${index}.multiplier` as const,
                              { required: true }
                            )}
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-primary/50 mb-1.5 block">
                            Description
                          </Label>
                          <Input // Short description
                            placeholder="Brief info"
                            className="h-10 bg-card border-gray-200"
                            {...register(
                              `tickets.${index}.description` as const,
                              { required: true }
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-card border-t border-gray-100 shrink-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-11 px-6 rounded-lg border-gray-200 text-primary/70 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-300 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="event-form"
            disabled={loading}
            className="h-11 px-8 rounded-lg bg-eventaty-gold text-white hover:bg-[#b8962c] shadow-lg shadow-eventaty-gold/20 cursor-pointer"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
