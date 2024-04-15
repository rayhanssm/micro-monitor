import { CircleX, ImageUp } from "lucide-react";
import React, { useState } from "react";

function UploadImgField() {
  const [image, setImage] = useState("");
  const [imageName, setImagename] = useState("");

  // TODO: adjust later
  const handleUploadImage = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      try {
        setImage(URL.createObjectURL(file));
        setImagename(file.name);
      } catch (error) {
        console.error("Error");
      }
    }
  };

  return (
    <div>
      <div className="w-full h-[133px] flex justify-center items-center border border-dashed rounded-lg hover:bg-slate-50 transition-colors">
        {image ? (
          <div
            className="group absolute w-[398px] h-[133px] bg-cover bg-no-repeat bg-center hover:brightness-50 rounded-lg"
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
        ) : (
          <div className="absolute flex items-center gap-1">
            <ImageUp color="#94A3B8" />
            <p className="text-sm text-slate-400">Upload image</p>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          className="opacity-0 w-full h-full cursor-pointer"
          onChange={handleUploadImage}
        />
      </div>
      {image && (
        <div className="flex justify-between mt-2 gap-1">
          <p className="truncate text-sm text-slate-500">{imageName}</p>
          <button
            onClick={() => {
              setImage("");
              setImagename("");
            }}
          >
            <CircleX color="#0F766E" />
          </button>
        </div>
      )}
    </div>
  );
}

export default UploadImgField;
