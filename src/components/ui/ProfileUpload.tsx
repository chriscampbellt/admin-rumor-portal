'use client';

import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { Edit2Icon, UploadIcon } from 'lucide-react';

import { useTheme } from '@/context/ThemeContext';

import { CommonButton } from './CommonButton';
import { useToast } from './toast';

interface UploadProps {
  accept?: string;
  beforeUpload?: (
    fileList: FileList | null,
    existingFiles: File[]
  ) => boolean | string;
  disabled?: boolean;
  multiple?: boolean;
  onChange?: (newFiles: File[]) => void;
  onFileRemove?: (updatedFiles: File[]) => void;
  uploadLimit?: number;
  defaultFiles?: File[];
  helperText?: string;
  subText?: string;
  showText?: boolean;
}

const ProfileUpload: React.FC<UploadProps> = ({
  accept,
  beforeUpload,
  disabled = false,
  multiple = false,
  onChange,
  onFileRemove,
  uploadLimit,
  defaultFiles = [],
  helperText = 'Upload an image of your talent',
  subText = 'Only JPG or PNG, Under 5 MB',
  showText = true,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const { push } = useToast();
  const { theme } = useTheme();

  useEffect(() => {
    if (defaultFiles.length) setFiles(defaultFiles);
  }, [defaultFiles]);

  const triggerMessage = (msg = 'Upload Failed!') => push(msg, 'error');

  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return files;

    let updatedFiles = [...files];
    for (const f of Array.from(newFiles)) {
      updatedFiles.push(f);
    }

    if (uploadLimit === 1) {
      updatedFiles = updatedFiles.slice(-1);
    } else if (
      typeof uploadLimit === 'number' &&
      updatedFiles.length > uploadLimit
    ) {
      updatedFiles = updatedFiles.slice(0, uploadLimit);
      triggerMessage(`Upload limit of ${uploadLimit} files reached.`);
    }

    return updatedFiles;
  };

  const onNewFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
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

  const removeFileAtIndex = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFileRemove?.(updatedFiles);
  };

  const triggerUpload = (e: MouseEvent<HTMLDivElement>) => {
    if (!disabled) fileInputRef.current?.click();
    e.stopPropagation();
  };

  const handleEditClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center justify-center p-6 transition">
      <input
        ref={fileInputRef}
        type="file"
        disabled={disabled}
        multiple={multiple}
        accept={accept}
        hidden
        onChange={onNewFileUpload}
      />

      {/* Empty state */}
      {files.length === 0 ? (
        <div
          onClick={triggerUpload}
          className="flex h-full cursor-pointer flex-col items-center justify-center text-center"
        >
          <div className="relative mb-4 flex h-[140px] w-[140px] items-center justify-center rounded-full border border-dashed border-gray-300">
            <Image
              src={
                theme === 'light'
                  ? '/images/background-logo-light.svg'
                  : '/images/background-logo-dark.svg'
              }
              alt="background-logo"
              height={70}
              width={70}
            />
            {showText && (
              <button
                type="button"
                onClick={handleEditClick}
                className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-ui-neutralSurfaceOnColor px-2.5 py-2.5 text-sm text-white transition-colors hover:bg-gray-700"
              >
                <Edit2Icon className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* If no text, show upload button */}
          {!showText && (
            <CommonButton
              onClick={() => handleEditClick}
              leftIcon={<UploadIcon size={16} className="group-hover:invert" />}
              type="button"
              className="h-auto w-44 rounded-full border-2 border-[#000] bg-transparent !px-4 py-2 text-[14px] font-medium text-black hover:bg-black hover:text-white"
            >
              Upload New Image
            </CommonButton>
          )}

          {/* Instructional text */}
          {showText && (
            <>
              <p className="text-base text-ui-neutralContentLight">
                {helperText}
              </p>
              <p className="text-base text-ui-neutralContentLight">{subText}</p>
            </>
          )}
        </div>
      ) : (
        /* Uploaded state */
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative mb-4 flex h-[140px] w-[140px] items-center justify-center overflow-hidden rounded-full">
            {files.map((file, index) => {
              const fileURL = URL.createObjectURL(file);
              const isImage = file.type.startsWith('image/');
              const isVideo = file.type.startsWith('video/');

              return (
                <div key={index} className="h-full w-full">
                  {isImage && (
                    <Image
                      src={fileURL}
                      alt={file.name}
                      width={500}
                      height={500}
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
                </div>
              );
            })}
          </div>

          {showText && (
            <button
              type="button"
              onClick={handleEditClick}
              className="absolute bottom-14 right-12 flex h-8 w-8 items-center justify-center rounded-full bg-ui-neutralSurfaceOnColor px-2.5 py-2.5 text-sm text-white transition-colors hover:bg-gray-700"
            >
              <Edit2Icon className="h-3.5 w-3.5" />
            </button>
          )}

          {showText && (
            <>
              <p className="text-base text-ui-neutralContentLight">
                {helperText}
              </p>
              <p className="text-base text-ui-neutralContentLight">{subText}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileUpload;
