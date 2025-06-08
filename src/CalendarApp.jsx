import { BrowserRouter } from "react-router"
import { AppRouter } from "./router"

function CalendarApp() {

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default CalendarApp
