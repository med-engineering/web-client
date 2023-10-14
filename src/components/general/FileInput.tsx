import React, { FC, useRef, ReactNode, CSSProperties, RefObject } from "react";

interface FileInputProps {
  width: string;
  height?: string;
  style?: CSSProperties;
  borderRadius?: string;
  className?: string;
  acceptableFiles?: string;
  acceptDrop?: boolean;
  isCircle?: boolean;
  onDragOverStyles?: CSSProperties;
  children?: ReactNode;
  onFileSelected?: (formDataFile: any, displayFile: any) => void;
}

const FileInput: FC<FileInputProps> = ({
  width,
  height = width,
  onDragOverStyles,
  borderRadius = 4,
  style,
  className,
  acceptableFiles = "",
  acceptDrop = true,
  isCircle,
  children,
  onFileSelected,
}) => {
  const fileInputRef: RefObject<HTMLInputElement> = useRef(null);
  const [isDragOver, setDragOver] = React.useState(false);

  const handleFileRead = (files: FileList) => {
    return new Promise((resolve, reject) => {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        resolve(e.target?.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleFileInputChange = () => {
    const selectedFiles = fileInputRef.current?.files;
    if (selectedFiles) {
      handleSelectedFiles(selectedFiles);
    }
  };

  const handleSelectedFiles = async (files: FileList) => {
    if (onFileSelected) {
      const file = await handleFileRead(files);
      const fileData = files[0];
      onFileSelected(fileData, file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (acceptDrop) {
      setDragOver(true);
    }
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (acceptDrop) {
      const files = e.dataTransfer.files;
      handleSelectedFiles(files);
    }
  };

  const handleContainerClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        accept={acceptableFiles}
        onChange={handleFileInputChange}
        style={{ display: "none" }}
      />
      <div
        style={{
          width,
          height,
          overflow: "hidden",
          cursor: "pointer",
          borderRadius: isCircle ? "50%" : borderRadius,
          ...style,
          ...(isDragOver && onDragOverStyles),
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleContainerClick}
        className={className}
      >
        {children}
      </div>
    </>
  );
};

export default FileInput;
