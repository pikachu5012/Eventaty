import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  X,
  Upload,
  MapPin,
  Image as ImageIcon,
  Plus,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { IVenue, IAmenity } from "@/types/venue";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface VenueFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  venue?: IVenue;
  onSubmit: (data: any) => Promise<void>;
  loading?: boolean;
}

const AMENITY_OPTIONS: IAmenity[] = [
  { name: "WiFi", icon: "wifi" },
  { name: "Parking", icon: "parking" },
  { name: "Food Court", icon: "food" },
  { name: "Wheelchair access", icon: "wheelchair" },
  { name: "VIP Lounge", icon: "vip" },
  { name: "air conditioning", icon: "ac" },
];

export function VenueForm({
  open,
  onOpenChange,
  venue,
  onSubmit,
  loading = false,
}: VenueFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    longitude: 0,
    latitude: 0,
    capacity: 0,
    images: [] as string[],
  });

  const [selectedAmenities, setSelectedAmenities] = useState<IAmenity[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([""]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    if (venue) {
      setFormData({
        name: venue.name || "",
        description: venue.description || "",
        address: venue.address || "",
        city: venue.city || "",
        state: venue.state || "",
        postalCode: venue.postalCode || "",
        country: venue.country || "",
        longitude: venue.longitude || 0,
        latitude: venue.latitude || 0,
        capacity: venue.capacity || 0,
        images: venue.images || [],
      });
      setSelectedAmenities(venue.amenities || []);
      if (venue.images && venue.images.length > 0) {
        setImageUrls(venue.images);
        setImagePreviews(venue.images);
      } else {
        setImageUrls([""]);
        setImagePreviews([]);
      }
    } else {
      // Reset form for new venue
      setFormData({
        name: "",
        description: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        longitude: 0,
        latitude: 0,
        capacity: 0,
        images: [],
      });
      setSelectedAmenities([]);
      setImageUrls([""]);
      setImagePreviews([]);
    }
  }, [venue, open]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "longitude" || name === "latitude" || name === "capacity"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const toggleAmenity = (amenity: IAmenity) => {
    setSelectedAmenities((prev) => {
      const exists = prev.find((a) => a.name === amenity.name);
      if (exists) {
        return prev.filter((a) => a.name !== amenity.name);
      } else {
        return [...prev, amenity];
      }
    });
  };

  const handleAddImageUrl = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const handleRemoveImageUrl = (index: number) => {
    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    setImageUrls(newImageUrls);

    const newImagePreviews = [...imagePreviews];
    newImagePreviews.splice(index, 1);
    setImagePreviews(newImagePreviews);
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);

    // Show preview for any valid URL (more permissive)
    if (
      value.trim() &&
      (value.startsWith("http://") || value.startsWith("https://"))
    ) {
      const newImagePreviews = [...imagePreviews];
      newImagePreviews[index] = value;
      setImagePreviews(newImagePreviews);
    } else if (!value.trim()) {
      // Clear preview if empty
      const newImagePreviews = [...imagePreviews];
      newImagePreviews[index] = "";
      setImagePreviews(newImagePreviews);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error("Venue name is required");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Description is required");
      return;
    }
    if (!formData.address.trim()) {
      toast.error("Address is required");
      return;
    }
    if (!formData.city.trim()) {
      toast.error("City is required");
      return;
    }
    if (!formData.state.trim()) {
      toast.error("State is required");
      return;
    }
    if (!formData.postalCode.trim()) {
      toast.error("Postal code is required");
      return;
    }
    if (!formData.country.trim()) {
      toast.error("Country is required");
      return;
    }
    if (formData.capacity <= 0) {
      toast.error("Capacity must be greater than 0");
      return;
    }

    // Parse image URLs - all images from the array
    const images = imageUrls.filter((url) => url.trim().length > 0);

    const submitData = {
      ...formData,
      amenities: selectedAmenities,
      images,
    };

    await onSubmit(submitData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            {venue ? "Edit Venue" : "Create New Venue"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Thumbnail Image Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-eventaty-gold" />
              Thumbnail Image
            </h3>

            <div className="flex gap-4 items-start p-4 bg-background/50 border border-eventaty-gold/20 rounded-xl">
              <div className="w-24 h-24 shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center relative">
                {imagePreviews[0] ? (
                  <Image
                    src={imagePreviews[0]}
                    alt="Venue Thumbnail"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <ImageIcon className="h-8 w-8 text-gray-300" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <Input
                  placeholder="https://example.com/thumbnail.jpg"
                  value={imageUrls[0] || ""}
                  onChange={(e) => handleImageUrlChange(0, e.target.value)}
                  className="bg-background border-gray-200 focus:border-eventaty-gold focus:ring-eventaty-gold/20"
                />
                <p className="text-[11px] text-primary/70">
                  This will be the main venue image. Preview updates
                  automatically.
                </p>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">
              Basic Information
            </h3>

            <div>
              <label className="block text-sm font-medium text-primary/70 mb-2">
                Venue Name <span className="text-red-500">*</span>
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter venue name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary/70 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter venue description"
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eventaty-gold focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary/70 mb-2">
                Capacity <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                placeholder="Enter venue capacity"
                required
                min="1"
              />
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {AMENITY_OPTIONS.map((amenity) => {
                const isSelected = selectedAmenities.some(
                  (a) => a.name === amenity.name
                );
                return (
                  <button
                    key={amenity.name}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      isSelected
                        ? "border-eventaty-gold bg-eventaty-gold/10 text-eventaty-gold"
                        : "border-gray-200 text-gray-600 hover:border-eventaty-gold/50"
                    }`}
                  >
                    {amenity.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
              <MapPin className="h-5 w-5 text-eventaty-gold" />
              Location
            </h3>

            <div>
              <label className="block text-sm font-medium text-primary/70 mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <Input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter street address"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary/70 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary/70 mb-2">
                  State <span className="text-red-500">*</span>
                </label>
                <Input
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Enter state"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary/70 mb-2">
                  Postal Code <span className="text-red-500">*</span>
                </label>
                <Input
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="Enter postal code"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary/70 mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <Input
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Enter country"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-primary/70">
                  Coordinates <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    toast.info("Map selector coming soon!");
                  }}
                  className="text-xs px-3 py-1.5 bg-eventaty-gold/10 text-eventaty-gold border border-eventaty-gold/30 rounded-lg hover:bg-eventaty-gold hover:text-white transition-colors"
                >
                  Select on Map
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-primary/50 mb-2">
                    Latitude
                  </label>
                  <Input
                    type="number"
                    step="any"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleInputChange}
                    placeholder="Enter latitude"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-primary/50 mb-2">
                    Longitude
                  </label>
                  <Input
                    type="number"
                    step="any"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleInputChange}
                    placeholder="Enter longitude"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Images Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                <Upload className="h-5 w-5 text-eventaty-gold" />
                Additional Images
              </h3>
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="text-xs px-3 py-1.5 bg-eventaty-gold/10 text-eventaty-gold border border-eventaty-gold/30 rounded-lg hover:bg-eventaty-gold hover:text-white transition-colors"
              >
                <Plus className="h-3.5 w-3.5 inline mr-1" />
                Add Image
              </button>
            </div>

            {imageUrls.slice(1).length > 0 ? (
              <div className="space-y-3">
                {imageUrls.slice(1).map((url, index) => (
                  <div
                    key={index + 1}
                    className="flex gap-4 items-start p-4 bg-background/50 border border-eventaty-gold/20 rounded-xl"
                  >
                    <div className="w-24 h-24 shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center relative">
                      {imagePreviews[index + 1] ? (
                        <Image
                          src={imagePreviews[index + 1]}
                          alt={`Preview ${index + 2}`}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        <ImageIcon className="h-8 w-8 text-gray-300" />
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <Input
                        placeholder="https://example.com/image.jpg"
                        value={url}
                        onChange={(e) =>
                          handleImageUrlChange(index + 1, e.target.value)
                        }
                        className="bg-background border-gray-200 focus:border-eventaty-gold focus:ring-eventaty-gold/20"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveImageUrl(index + 1)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500 italic">
                No additional images added. Click "Add Image" to include more
                venue photos.
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-6 py-2.5 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-eventaty-gold text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#b8962c] transition-colors shadow-sm shadow-eventaty-gold/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : venue ? "Update Venue" : "Create Venue"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
