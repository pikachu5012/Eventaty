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
import { useTranslations } from "next-intl";

const DEFAULT_VENUE_IMAGE =
  "https://www.valcoustics.com/wp-content/uploads/2020/10/theater.jpg";
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
  const t = useTranslations('VenueForm');
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    longitude: "" as string | number,
    latitude: "" as string | number,
    capacity: "" as string | number,
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
        longitude: venue.longitude ?? "",
        latitude: venue.latitude ?? "",
        capacity: venue.capacity ?? "",
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
        longitude: "",
        latitude: "",
        capacity: "",
        images: [],
      });
      setSelectedAmenities([]);
      setImageUrls([""]);
      setImagePreviews([]);
    }
  }, [venue, open]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
      toast.error(t('errors.nameRequired'));
      return;
    }
    if (!formData.description.trim()) {
      toast.error(t('errors.descRequired'));
      return;
    }
    if (!formData.address.trim()) {
      toast.error(t('errors.addressRequired'));
      return;
    }
    if (!formData.city.trim()) {
      toast.error(t('errors.cityRequired'));
      return;
    }
    if (!formData.state.trim()) {
      toast.error(t('errors.stateRequired'));
      return;
    }
    if (!formData.postalCode.trim()) {
      toast.error(t('errors.postalCodeRequired'));
      return;
    }
    if (!formData.country.trim()) {
      toast.error(t('errors.countryRequired'));
      return;
    }
    if (Number(formData.capacity) <= 0) {
      toast.error(t('errors.capacityMin'));
      return;
    }

    // Parse image URLs - all images from the array
    let images = imageUrls.filter((url) => url.trim().length > 0);

    // Use default image if none provided
    if (images.length === 0) {
      images = [DEFAULT_VENUE_IMAGE];
    }

    const submitData = {
      ...formData,
      longitude: parseFloat(formData.longitude as string) || 0,
      latitude: parseFloat(formData.latitude as string) || 0,
      capacity: parseInt(formData.capacity as string) || 0,
      amenities: selectedAmenities,
      images,
    };

    await onSubmit(submitData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col p-0 gap-0 custom-scrollbar"
        data-lenis-prevent
      >
        <DialogHeader className="p-6 pb-2 sticky top-0 bg-card z-20 border-b border-gray-100 shrink-0">
          <DialogTitle className="text-2xl font-bold text-primary">
            {venue ? t('editTitle') : t('createTitle')}
          </DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="text-eventaty-gold hover:text-eventaty-gold/80 transition-colors p-1 cursor-pointer absolute top-2 right-2"
          >
            <X className="h-5 w-5" />
          </button>
        </DialogHeader>

        <div className="flex-1 p-6 pt-2">
          <form id="venue-form" onSubmit={handleSubmit} className="space-y-6">
            {/* Thumbnail Image Section */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-eventaty-gold" />
                {t('thumbnail')}
              </h3>

              <div className="flex gap-4 items-start p-4 bg-background/50 border border-eventaty-gold/20 rounded-xl">
                <div className="w-24 h-24 shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center relative">
                  {(imagePreviews[0] || DEFAULT_VENUE_IMAGE) ? (
                    <Image
                      src={imagePreviews[0] || DEFAULT_VENUE_IMAGE}
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
                    {t('imageHelp')}
                  </p>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">
                {t('basicInfo')}
              </h3>

              <div>
                <label className="block text-sm font-medium text-primary/70 mb-2">
                  {t('name')} <span className="text-red-500">*</span>
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t('namePlaceholder')}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary/70 mb-2">
                  {t('description')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder={t('descPlaceholder')}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eventaty-gold focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary/70 mb-2">
                  {t('capacity')} <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  placeholder={t('capacityPlaceholder')}
                  required
                  min="1"
                />
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">{t('amenities')}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {AMENITY_OPTIONS.map((amenity) => {
                  const isSelected = selectedAmenities.some(
                    (a) => a.name === amenity.name,
                  );
                  return (
                    <button
                      key={amenity.name}
                      type="button"
                      onClick={() => toggleAmenity(amenity)}
                      className={`p-3 rounded-lg border-[1.5px] text-sm font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? "border-violet-500 bg-violet-500/10 dark:bg-violet-950/20 text-violet-600 dark:text-violet-400"
                          : "border-gray-200 dark:border-slate-800 text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-900 hover:border-violet-500/50"
                      }`}
                    >
                      {/* Try to map amenity name, fallback to English name if key not found */}
                      {t.has(`amenityNames.${amenity.icon}`) ? t(`amenityNames.${amenity.icon}`) : amenity.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                <MapPin className="h-5 w-5 text-eventaty-gold" />
                {t('location')}
              </h3>

              <div>
                <label className="block text-sm font-medium text-primary/70 mb-2">
                  {t('address')} <span className="text-red-500">*</span>
                </label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder={t('addressPlaceholder')}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary/70 mb-2">
                    {t('city')} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder={t('cityPlaceholder')}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary/70 mb-2">
                    {t('state')} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder={t('statePlaceholder')}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary/70 mb-2">
                    {t('postalCode')} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder={t('postalCodePlaceholder')}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary/70 mb-2">
                    {t('country')} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder={t('countryPlaceholder')}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-primary/70">
                    {t('coordinates')} <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      toast.info(t('mapComingSoon'));
                    }}
                    className="text-xs px-3 py-1.5 bg-eventaty-gold/10 text-eventaty-gold border border-eventaty-gold/30 rounded-lg hover:bg-eventaty-gold hover:text-white transition-colors"
                  >
                    {t('selectMap')}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-primary/50 mb-2">
                      {t('latitude')}
                    </label>
                    <Input
                      type="number"
                      step="any"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleInputChange}
                      placeholder={t('latitude')}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-primary/50 mb-2">
                      {t('longitude')}
                    </label>
                    <Input
                      type="number"
                      step="any"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleInputChange}
                      placeholder={t('longitude')}
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
                  {t('additionalImages')}
                </h3>
                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="text-xs px-3 py-1.5 bg-eventaty-gold/10 text-eventaty-gold border border-eventaty-gold/30 rounded-lg hover:bg-eventaty-gold hover:text-white transition-colors"
                >
                  <Plus className="h-3.5 w-3.5 inline mr-1" />
                  {t('addImage')}
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
                  {t('noImages')}
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Form Actions Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 mt-auto bg-card shrink-0 sticky bottom-0 z-20">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-6 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white font-medium transition-colors cursor-pointer"
            disabled={loading}
          >
            {t('cancel')}
          </button>
          <button
            type="submit"
            form="venue-form"
            disabled={loading}
            className="flex items-center gap-2 bg-violet-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-violet-700 transition-colors shadow-sm shadow-violet-600/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? t('saving') : venue ? t('update') : t('create')}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
