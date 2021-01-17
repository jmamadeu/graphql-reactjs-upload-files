import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface DropZoneType {
  selectedFiles: (acceptedFiles: File[]) => void;
}

const DropZone: React.FC<DropZoneType> = ({ selectedFiles }) => {
  const onDrop = useCallback((acceptedFiles) => {
    selectedFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className='p-10 bg-gray-300 justify-center border-dashed flex border border-black my-5'
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className='font-medium text-black'>Drop the files here ...</p>
      ) : (
        <p className='font-medium text-black'>
          Drag 'n' drop some files here, or click to select files
        </p>
      )}
    </div>
  );
};

export default React.memo(DropZone);
