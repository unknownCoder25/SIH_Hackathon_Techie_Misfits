import { useState, useEffect } from "react"
import img1 from "./assets/images/img1.jpeg"
import img2 from "./assets/images/img2.jpeg"
import img3 from "./assets/images/img3.jpeg"
import img4 from "./assets/images/img4.jpeg"
import img5 from "./assets/images/img5.jpeg"

//slidshow images array
const SLIDESHOW_IMAGES = [img1, img2, img3, img4, img5]

//function for slideshow
export default function SlideshowBackground() {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const t = setInterval(
      () => setCurrent((c) => (c + 1) % SLIDESHOW_IMAGES.length),
      5500,
    )
    return () => clearInterval(t)
  }, [])
  return (
    <div className="absolute inset-0">
      {SLIDESHOW_IMAGES.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 bg-slate-700"
          style={{
            opacity: i === current ? 1 : 0,
            transition: "opacity 1500ms ease",
          }}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
      ))}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,15,29,0.60) 0%, rgba(8,15,29,0.76) 60%, rgba(8,15,29,0.84) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 110%, rgba(30,58,95,0.28) 0%, transparent 68%)",
        }}
      />
    </div>
  )
}
