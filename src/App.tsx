import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"

interface Gradient {
  gradient: string,
  css: string
}


function App() {
  const [num, setNum] = useState(12)
  const [type, setType] = useState("linear")
  const [gradient, setGradient] = useState<Gradient[]>([])

  const getHexColors = () => {
    const rgb = 255 * 255 * 255
    const random = Math.floor(Math.random() * rgb)
    const hexCode = random.toString(16)
    const colorHex = hexCode.padEnd(6, "0")
    return `#${colorHex}`
  }

  const generateGradient = () => {
    const colors = []
    for (let i = 0; i < num; i++) {
      const c1 = getHexColors()
      const c2 = getHexColors()
      const degree = Math.floor(Math.random() * 360)
      const degreeString = `${degree}deg`

      if (type === "linear") {
        colors.push({
          gradient: `linear-gradient(${degreeString}, ${c1}, ${c2})`,
          css: `background : 'linear-gradient(${degreeString}, ${c1}, ${c2})'`
        })
      } else {
        colors.push({
          gradient: `radial-gradient(circle, ${c1}, ${c2})`,
          css: `background : 'radial-gradient(circle, ${c1}, ${c2})'`
        })
      }


    }
    setGradient(colors)

  }

  const onCopy = (css: string) => {
    navigator.clipboard.writeText(css)
    toast.success("copié", { position: "top-center" })
  }

  useEffect(() => {
    generateGradient()
  }, [num])


  return (
    <div className="min-h-screen bg-gray-300 py-12">
      <div className="w-9/12 mx-auto space-y-12">
        <div className="flex justify-between p-6" style={{ background: getHexColors() }}>
          <h1 className="text-3xl font-bold">Gradient Colors </h1>

          <div className="flex gap-4">
            <input className="w-[100px] p-2 rounded-lg border border-slate-300" placeholder="12" value={num} onChange={(e) => setNum(Number(e.target.value))} />
            <select className="w-[100px] p-2 rounded-lg border border-slate-300" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>
            <button type="button" className="px-16 py-2 bg-rose-500 text-white rounded font-medium" onClick={generateGradient}>Generate</button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">


          {gradient.map((item, index) => (
            <div key={index} className="h-[180px] rounded-xl relative" style={{ background: item.gradient }}>
              <button onClick={() => onCopy(item.css)} className="absolute bottom-3 right-3 bg-black/50 hover:bg-black text-white font-medium rounded px-2 py-1 text-[10px]">
                Copy
              </button>
            </div>
          ))}


        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
