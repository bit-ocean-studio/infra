import { TransitionChart } from './components'
import { BarChart } from './components/BarChart'

export default function App() {
  return (
    <div className="grid min-h-screen w-screen grid-cols-4 grid-rows-12 gap-2 overflow-y-scroll p-2 sm:h-screen sm:grid-cols-12 sm:overflow-hidden">
      <div className="col-span-4 row-span-4 border border-slate-300 p-2">
        <BarChart />
      </div>
      <div className="col-span-4 row-span-4 border border-slate-300 p-2">
        <BarChart />
      </div>
      <div className="col-span-4 row-span-4 border border-slate-300 p-2">
        <BarChart />
      </div>
      <div className="col-span-4 row-span-4 border border-slate-300 p-2">
        <BarChart />
      </div>
      <div className="col-span-4 row-span-4 border border-slate-300 p-2">
        <BarChart />
      </div>
      <div className="col-span-4 row-span-4 border border-slate-300 p-2">
        <BarChart />
      </div>
      <div className="col-span-4 row-span-4 border border-slate-300 p-2">
        <BarChart />
      </div>
      <div className="col-span-4 row-span-4 border border-slate-300 p-2">
        <BarChart />
      </div>
      <div className="col-span-4 row-span-4 border border-slate-300 p-2">
        <TransitionChart />
      </div>
    </div>
  )
}
