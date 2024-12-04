import './App.css';
import { Container } from 'react-bootstrap';
import Invoiceform from './components/Invoice-form';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {

  return (
    <div className='App d-flex flex-column align-items-center justify-content-center w-100'>
      <Container>
         <Invoiceform/>
      </Container>
    </div>
  )
}

export default App
