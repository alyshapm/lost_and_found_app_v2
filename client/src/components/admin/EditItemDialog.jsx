import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Button,
  Input,
  Select,
  Option,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { convertFileToBase64 } from "../../utils/convertToBase64";

const ImageUpload = ({ onFileChange, imagePreview }) => (
  <div className="space-y-2">
    <Typography variant="small" color="blue-gray">
      Upload Image
    </Typography>
    <div
      className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors hover:border-gray-400"
      onClick={() => onFileChange()}
    >
      <input type="file" accept="image/*" hidden onChange={onFileChange} />
      <CloudArrowUpIcon className="h-12 w-12 mx-auto text-gray-400" />
      <Typography color="gray" className="mt-2">
        Drag and drop an image here, or click to select a file
      </Typography>
    </div>
    {imagePreview && (
      <img
        src={imagePreview}
        alt="Preview"
        className="w-20 h-20 object-cover mt-2 rounded-lg"
      />
    )}
  </div>
);

const EditItemDialog = ({ isOpen, onClose, item, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    campus: "",
    foundAt: "",
    storingLocation: "",
    founderEmail: "",
    image: null,
    imagePreview: "",
  });
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        ...item,
        imagePreview: item.image,
      });
    }
  }, [item]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      setHasChanges(JSON.stringify(updatedData) !== JSON.stringify(item));
      return updatedData;
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64Image = await convertFileToBase64(file);
      setFormData((prevData) => ({
        ...prevData,
        image: file,
        imagePreview: base64Image,
      }));
      setHasChanges(true);
    }
  };

  const handleSaveChanges = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} handler={onClose} size="xl">
      <DialogHeader>Edit Item</DialogHeader>
      <DialogBody divider className="overflow-y-auto max-h-[calc(100vh-200px)]">
        <form className="flex flex-col gap-4">
          <Input
            label="Item Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <Select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <Option value="Electronics">Electronics</Option>
            <Option value="Clothing">Clothing</Option>
            <Option value="Books">Books</Option>
            <Option value="Other">Other</Option>
          </Select>
          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <Select
            label="Campus"
            name="campus"
            value={formData.campus}
            onChange={handleInputChange}
          >
            <Option value="Main Campus">Main Campus</Option>
            <Option value="North Campus">North Campus</Option>
            <Option value="South Campus">South Campus</Option>
          </Select>
          <Input
            label="Found At"
            name="foundAt"
            value={formData.foundAt}
            onChange={handleInputChange}
          />
          <Input
            label="Storing Location"
            name="storingLocation"
            value={formData.storingLocation}
            onChange={handleInputChange}
          />
          <Input
            label="Founder's Email"
            name="founderEmail"
            value={formData.founderEmail}
            onChange={handleInputChange}
          />
          <ImageUpload
            onFileChange={handleFileChange}
            imagePreview={formData.imagePreview}
          />
        </form>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="gradient"
          color="green"
          disabled={!hasChanges}
          onClick={handleSaveChanges}
        >
          Save Changes
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default EditItemDialog;
