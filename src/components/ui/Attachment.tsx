'use client';

import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { Trash2, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

interface UploadProps {
  accept?: string;
  beforeUpload?: (
    _fileList: FileList | null,
    _existingFiles: File[]
  ) => boolean | string;
  disabled?: boolean;
  multiple?: boolean;
  onChange?: (_newFiles: File[]) => void;
  onFileRemove?: (_updatedFiles: File[]) => void;
  uploadLimit?: number;
  defaultFiles?: File[];
}

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'application/pdf',
  'video/mp4',
];
const MAX_FILES = 3;

const Attachment: React.FC<UploadProps> = ({
  accept = ALLOWED_TYPES.join(','),
  beforeUpload,
  disabled = false,
  multiple = false,
  onChange,
  onFileRemove,
  uploadLimit = MAX_FILES,
  defaultFiles = [],
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (defaultFiles.length) setFiles(defaultFiles);
  }, [defaultFiles]);

  const triggerMessage = (msg = 'Upload Failed!') => toast.error(msg);

  const validateFiles = (selectedFiles: FileList | null): boolean => {
    if (!selectedFiles) return false;

    const totalCount = files.length + selectedFiles.length;

    if (totalCount > uploadLimit) {
      triggerMessage(`You can upload up to ${uploadLimit} files only.`);
      return false;
    }

    for (const file of Array.from(selectedFiles)) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        triggerMessage(
          `File type not allowed: ${file.name}. Allowed: JPEG, PNG, PDF, MP4.`
        );
        return false;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        triggerMessage(
          `File "${file.name}" exceeds ${MAX_FILE_SIZE_MB} MB limit.`
        );
        return false;
      }
    }
    return true;
  };

  const addFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return files;

    let updatedFiles = [...files, ...Array.from(selectedFiles)];

    if (uploadLimit === 1) updatedFiles = updatedFiles.slice(-1);
    else if (updatedFiles.length > uploadLimit) {
      updatedFiles = updatedFiles.slice(0, uploadLimit);
      triggerMessage(`Upload limit of ${uploadLimit} files reached.`);
    }

    return updatedFiles;
  };

  const onNewFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!validateFiles(selectedFiles)) {
      e.target.value = '';
      return;
    }

    if (beforeUpload) {
      const result = beforeUpload(selectedFiles, files);
      if (result === false) return triggerMessage();
      if (typeof result === 'string') return triggerMessage(result);
    }

    const updatedFiles = addFiles(selectedFiles);
    setFiles(updatedFiles);
    onChange?.(updatedFiles);
    e.target.value = '';
  };

  const removeFileAtIndex = (
    e: MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.stopPropagation();
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFileRemove?.(updatedFiles);
  };

  const triggerUpload = () => {
    if (!disabled) fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        disabled={disabled}
        multiple={multiple}
        accept={accept}
        hidden
        onChange={onNewFileUpload}
      />

      <div className="flex w-full items-center gap-4 overflow-x-auto">
        {/* Upload button */}
        {files.length < uploadLimit && (
          <button
            type="button"
            onClick={triggerUpload}
            className="hover:border-primary flex h-28 w-28 flex-shrink-0 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-border bg-transparent text-ui-neutralSurfaceOnColor transition"
          >
            <Upload className="h-7 w-7 text-ui-neutralSurfaceOnColor" />
          </button>
        )}

        {/* Uploaded items */}
        {files.map((file, index) => {
          const fileURL = URL.createObjectURL(file);
          const isImage = file.type.startsWith('image/');
          const isVideo = file.type.startsWith('video/');
          const isPDF = file.type === 'application/pdf';

          return (
            <div
              key={index}
              className="group relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl border border-border"
            >
              {isImage && (
                <Image
                  src={fileURL}
                  alt={file.name}
                  width={450}
                  height={450}
                  className="h-full w-full object-cover"
                />
              )}
              {isVideo && (
                <video
                  src={fileURL}
                  controls
                  className="h-full w-full object-cover"
                />
              )}
              {isPDF && (
                <div className="flex h-full w-full items-center justify-center bg-gray-100 text-sm font-medium text-gray-700">
                  PDF
                </div>
              )}

              <button
                type="button"
                onClick={e => removeFileAtIndex(e, index)}
                className="absolute right-[35%] top-[40%] flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-600 shadow"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-sm text-ui-neutralContentLight">
        Upload up to {uploadLimit} files. Allowed: JPEG, PNG, PDF, MP4. Max
        size: {MAX_FILE_SIZE_MB} MB.
      </p>
    </div>
  );
};

export default Attachment;
