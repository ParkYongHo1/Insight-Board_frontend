import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: "black",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "20%",
        position: "relative",
      }}
    >
      <div
        style={{
          background: "white",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          zIndex: 2,
        }}
      />

      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute" }}
      >
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="2 2"
          strokeOpacity="0.5"
        />
        <circle cx="5" cy="5" r="1.5" fill="white" />
        <circle cx="19" cy="5" r="1.5" fill="white" />
        <circle cx="5" cy="19" r="1.5" fill="white" />
        <circle cx="19" cy="19" r="1.5" fill="white" />
      </svg>
    </div>,
    { ...size },
  );
}
