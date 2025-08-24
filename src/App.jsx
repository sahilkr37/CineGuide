import Layout from "./components/Layout"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
function App() {

  return <Provider store={appStore}><Layout /></Provider>
}

export default App
