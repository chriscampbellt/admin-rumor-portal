'use client';

import React, { useRef, useState } from 'react';

import Image from 'next/image';

import { AlertCircle, Upload, UploadIcon, X } from 'lucide-react';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

interface CsvUploadProps {
  onSuccess?: (file: File) => void;
  onError?: () => void;
}

interface FileChipProps {
  file: File;
  onRemove: () => void;
}

const FileChip: React.FC<FileChipProps> = ({ file, onRemove }) => {
  const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
  return (
    <div className="mt-4 flex w-fit items-center gap-2">
      <div className="flex items-center justify-center">
        <Image
          src="/images/Files Small.svg"
          width={40}
          height={50}
          alt="File Icon"
        />
      </div>
      <div className="flex-1">
        <p className="max-w-32 truncate text-sm font-medium capitalize text-gray-900">
          {file.name}
        </p>
        <p className="text-xs text-gray-500">.csv | {sizeInMB} MB</p>
      </div>
      <button
        onClick={onRemove}
        className="flex h-6 w-6 items-center justify-center rounded-full bg-black"
        aria-label="Remove file"
      >
        <X className="h-4 w-4 text-white" />
      </button>
    </div>
  );
};

export default function CsvUpload({ onSuccess, onError }: CsvUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isUploadDisabled =
    uploadedFile !== null || uploadStatus === 'uploading';

  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadStatus('success');
            if (uploadedFile && onSuccess) onSuccess(uploadedFile);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleFileSelection = (files: File[]) => {
    if (isUploadDisabled) return;
    const file = files[0];
    if (!file) return;

    const isCsv =
      file.type === 'text/csv' ||
      file.type === 'application/vnd.ms-excel' ||
      file.name.toLowerCase().endsWith('.csv');

    const minSize = 0.5 * 1024 * 1024;

    if (!isCsv || file.size >= minSize) {
      setUploadStatus('error');
      setUploadedFile(null);
      if (onError) onError();
      return;
    }
    setUploadedFile(file);
    setUploadStatus('uploading');
    simulateProgress();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    handleFileSelection([e.target.files[0]]);
  };

  const handleBrowseFiles = () => {
    if (!isUploadDisabled) fileInputRef.current?.click();
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setUploadStatus('idle');
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const dropZoneClasses = `relative rounded-lg border-2 border-dashed px-2 py-12 pb-14 text-center transition-colors
    ${uploadStatus === 'success' ? 'bg-gray-50 opacity-70' : 'bg-white'}
    ${dragOver && !isUploadDisabled ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}
    ${isUploadDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
    ${uploadStatus === 'error' ? 'border-red-400 bg-red-50' : ''}
  `;

  let dropZoneContent;

  if (uploadStatus === 'uploading') {
    dropZoneContent = (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-6 font-diatype">
        <UploadIcon size={28} className="text-ui-neutralSurfaceOnColor" />
        <div className="w-2/4 rounded-full bg-ui-neutralSurfaceSupport">
          <div
            className="h-1.5 rounded-full bg-ui-colorContentSuccess transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm text-ui-neutralSurfaceOnColor">
          {progress < 100 ? `Uploading... ${progress}%` : 'Completed'}
        </span>
      </div>
    );
  } else if (uploadStatus === 'error') {
    dropZoneContent = (
      <div className="space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <AlertCircle className="h-6 w-6 text-red-600" />
        </div>
        <p className="font-medium text-red-600">Upload failed</p>
        <p className="mt-1 text-sm text-red-600">
          File size must not exceed 0.5 MB.
        </p>
        <button
          onClick={resetUpload}
          className="text-sm text-blue-600 underline hover:text-blue-800"
        >
          Try again
        </button>
      </div>
    );
  } else {
    dropZoneContent = (
      <div className="space-y-1">
        <div className="mx-auto flex h-10 w-12 items-center justify-center rounded-full">
          <Upload className="h-6 w-6 text-ui-neutralSurfaceOnColor" />
        </div>
        <p className="text-ui-neutralSurfaceOnColor">Drag & Drop file here</p>
        <p className="text-sm text-ui-neutralSurfaceOnColor">
          or{' '}
          <span
            className={`underline ${!isUploadDisabled ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            onClick={handleBrowseFiles}
          >
            upload a file
          </span>{' '}
          from your computer
        </p>
        <p className="text-xs text-ui-neutralContentLight">
          Only <strong className="text-ui-neutralSurfaceOnColor">CSV</strong>{' '}
          files allowed, up to 0.5 MB
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2 font-diatype">
      <label className="block text-sm font-medium text-gray-700">
        CSV File
      </label>
      <div
        className={dropZoneClasses}
        onDragOver={e => {
          e.preventDefault();
          if (!isUploadDisabled) setDragOver(true);
        }}
        onDragLeave={e => {
          e.preventDefault();
          if (!isUploadDisabled) setDragOver(false);
        }}
        onDrop={e => {
          e.preventDefault();
          setDragOver(false);
          if (!isUploadDisabled && e.dataTransfer.files.length) {
            handleFileSelection([e.dataTransfer.files[0]]);
          }
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileInputChange}
          className="hidden"
          disabled={isUploadDisabled}
        />

        {dropZoneContent}
      </div>
      {uploadStatus === 'error' ? (
        <p className="mt-1 text-sm text-red-600">
          File size must not exceed 0.5 MB.
        </p>
      ) : null}
      {uploadStatus === 'success' && uploadedFile && (
        <FileChip file={uploadedFile} onRemove={resetUpload} />
      )}
    </div>
  );
}
