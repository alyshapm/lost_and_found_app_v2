import React, { useState, useCallback } from "react";
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
import { useDropzone } from "react-dropzone";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { convertFileToBase64 } from "../../utils/convertToBase64";

const ImageUpload = ({ onFileChange }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        onFileChange(acceptedFiles[0]);
      }
    },
    [onFileChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
        isDragActive
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-gray-400"
      }`}
    >
      <input {...getInputProps()} />
      <CloudArrowUpIcon className="h-12 w-12 mx-auto text-gray-400" />
      <Typography color="gray" className="mt-2">
        {isDragActive
          ? "Drop the image here"
          : "Drag and drop an image here, or click to select a file"}
      </Typography>
    </div>
  );
};

const AddItemDialog = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    campus: "",
    foundAt: "",
    storingLocation: "",
    founderEmail: "",
    image: null,
    imagePreview: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (file) => {
    const base64Image = await convertFileToBase64(file);
    setFormData({ ...formData, image: file, imagePreview: base64Image });
  };

  return (
    <Dialog open={isOpen} handler={onClose} size="xl">
      <DialogHeader>Add New Item</DialogHeader>
      <DialogBody divider className="overflow-y-auto max-h-[calc(100vh-200px)]">
        <form className="flex flex-col gap-4">
          <Input label="Item Name" name="name" onChange={handleInputChange} />
          <Select label="Category" name="category" onChange={handleInputChange}>
            <Option value="Electronics">Electronics</Option>
            <Option value="Clothing">Clothing</Option>
            <Option value="Books">Books</Option>
            <Option value="Other">Other</Option>
          </Select>
          <Textarea
            label="Description"
            name="description"
            onChange={handleInputChange}
          />
          <Select label="Campus" name="campus" onChange={handleInputChange}>
            <Option value="Main Campus">Main Campus</Option>
            <Option value="North Campus">North Campus</Option>
            <Option value="South Campus">South Campus</Option>
          </Select>
          <Input label="Found At" name="foundAt" onChange={handleInputChange} />
          <Input
            label="Storing Location"
            name="storingLocation"
            onChange={handleInputChange}
          />
          <Input
            label="Founder's Email"
            name="founderEmail"
            onChange={handleInputChange}
          />
          <div className="space-y-2">
            <Typography variant="small" color="blue-gray">
              Upload Image
            </Typography>
            <ImageUpload onFileChange={handleFileChange} />
          </div>
          {formData.imagePreview && (
            <div className="mt-2">
              <Typography variant="small" color="blue-gray">
                Image Preview:
              </Typography>
              <img
                src={formData.imagePreview}
                alt="Selected Item"
                className="w-20 h-20 object-cover mt-2 rounded-lg"
              />
            </div>
          )}
        </form>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={() => {
            /* Add item logic */
            onClose();
          }}
        >
          Add Item
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddItemDialog;
