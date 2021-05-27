import "./App.scss";
import SideButton from "./components/SideButton";

function App() {
  return (
    <div className='App'>
      <div className='wrapper-main'>
        <div className='leftsidebar'>
          <ul>
            <SideButton symbol='' text='Testing' />
            <li className='leftsidebar__button'>Home</li>
            <li className='leftsidebar__button'>Notifications</li>
            <li className='leftsidebar__button'>Profile</li>
          </ul>
        </div>
        <div className='content'>
          <div className='mainfeed'></div>
          <div className='rightsidebar'>
            Rightsidebar rightsidebar rightsidebar rightsidebar rightsidebar
            rightsidebar rightsidebar rightsidebar rightsidebar rightsidebar
            rightsidebar rightsidebar
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
