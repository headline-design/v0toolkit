"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Plus } from "lucide-react"
import type { V0Profile } from "@/lib/types/v0-profile"
import { v0ProfileService } from "@/lib/services/v0-profile-service"

interface ProfileEditDialogProps {
  profile: V0Profile
  onProfileUpdate: (profile: V0Profile) => void
  children: React.ReactNode
}

export function ProfileEditDialog({ profile, onProfileUpdate, children }: ProfileEditDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: profile.name,
    category: profile.category,
    description: profile.description,
    tags: [...profile.tags],
  })
  const [newTag, setNewTag] = useState("")

  const categories = [
    "Development",
    "Design",
    "Analysis",
    "Writing",
    "Marketing",
    "Business",
    "Education",
    "Research",
    "Other",
  ]

  const handleSave = () => {
    const updatedProfile: V0Profile = {
      ...profile,
      name: formData.name,
      category: formData.category,
      description: formData.description,
      tags: formData.tags,
      updatedAt: new Date(),
    }

    v0ProfileService.saveProfile(updatedProfile)
    onProfileUpdate(updatedProfile)
    setOpen(false)
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      })
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-lg">Edit Profile</DialogTitle>
          <DialogDescription className="text-sm">
            Update the basic information for your AI assistant. Advanced settings like traits and tasks can be
            configured on the profile page.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-3">
          {/* Assistant Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm">
              Assistant Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter assistant name"
              className="h-8"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm">
              Category
            </Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what this assistant specializes in..."
              rows={3}
              className="text-sm"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label className="text-sm">Tags</Label>

            {/* Current Tags */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs h-5 px-2">
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-destructive transition-colors"
                      type="button"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Add New Tag */}
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a tag..."
                className="flex-1 h-8"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addTag}
                disabled={!newTag.trim() || formData.tags.includes(newTag.trim())}
                className="h-8 px-2 bg-transparent"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} size="sm" className="h-8">
            Cancel
          </Button>
          <Button onClick={handleSave} size="sm" className="h-8">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
