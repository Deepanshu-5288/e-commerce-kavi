import React, { useState } from 'react'
import ChatBot from 'react-simple-chatbot'
// import { ThemeProvider } from 'styled-components'
import Post from './Post'
import "./chatbot.css"
import GetAllOrders from './GetAllOrders';
import chatIcon from "./chatIcon.png"
// import Link from './Link'
// const theme = {
//   background: '#f5f8fb',
//   fontFamily: 'Helvetica Neue',
//   headerBgColor: '#0f4d4a',
//   headerFontColor: '#fff',
//   headerFontSize: '15px',
//   botBubbleColor: '#0f4d4a',
//   botFontColor: '#fff',
//   userBubbleColor: '#fff',
//   userFontColor: '#4a4a4a',
// }

// all available config props
const config = {
  width: '300px',
  height: '400px',
  hideUserAvatar: true,
  placeholder: 'Type your response.',
  headerTitle: 'ChatBot',
}

const Chatbot = (props) => {
  let [showChat, setShowChat] = useState(false)

  const startChat = () => {
    setShowChat(!showChat)
  }
  // const hideChat = () => {
  //   setShowChat(false)
  // }

  return (
    <div  className="chatbot">
      <div style={{ display: showChat ? '' : 'none' }}>
        <ChatBot
         bubbleStyle={{ fontSize: '.6rem', }}
         bubbleOptionStyle={{ fontSize: '.6rem', }}
        //   speechSynthesis={{ enable: true, lang: 'en-US' }}
        //   recognitionEnable={true}
          steps={[
            {
              id: 'welcome',
              message: 'Hello!',
              trigger: 'q-firstname',
            },
            /* Paste */
            {
              id: 'q-firstname',
              message: 'What is your  name?',
              trigger: 'firstname',
            },
            {
              id: 'firstname',
              user: true,
              validator: (value) => {
                if (/^[A-Za-z]+$/.test(value)) {
                  return true
                } else {
                  return 'Please input alphabet characters only.'
                }
              },
              trigger: 'rmcbot',
            },
            {
              id: 'rmcbot',
              message:
                'Hi,{previousValue} I am RMC Bot! What can I do for you?',
              trigger: 'qtype',
            },
            {
              id: 'qtype',
              options: [
                { value: 1, label: 'LogIn Issue ?', trigger: 'qlogin' },
                { value: 2, label: ' Register Issue ?', trigger: 'qlogin' },
                { value: 3, label: 'Order details', trigger: 'qorderoption' },
                { value: 4, label: 'Connect with support', trigger: 'qsupport' },
              ],
            },
            {
              id: 'qlogin',
              options: [
                { value: 1, label: 'Captcha Issues ?', trigger: '4' },
                { value: 2, label: ' Authentication fails ?', trigger: '3' },
                { value: 3, label: 'Not able to click login button', trigger: '5' },
                { value: 4, label: 'More Information', trigger: '6' },
              ],
            },
            {
              id: 'qorderoption',
              options: [
                { value: 1, label: 'Get My Orders', trigger: 'qorder' },
                { value: 2, label: 'Refund Policy', trigger: 'qorderrefund' },
                { value: 4, label: 'More Information', trigger: '6' },
              ],
            },
            {
              id: '3',
              message:
                'Sorry for the inconvenience. Go through the FAQ. If not solved Will check and update. Thank you',
              trigger: 'qtype',
            },
            {
              id: '4',
              message:
                'Sorry for the inconvenience. Go through the FAQ. If not solved Will check and update. Thank you.',
              trigger: 'qtype',
            },
            {
              id: '5',
              message:
                'Sorry for the inconvenience. Go through the FAQ. If not solved Will check and update. Thank you',
              trigger: 'qtype',
            },
            {
              id: '6',
              message: 'Sorry for the inconvenience. Go through the FAQ. If not solved Will check and update. Thank you',
              trigger: 'q-submit',
            },
            {
              id: 'qsupport',
              message: 'mail: abc@gmail.com   Mobile: 56789088764',
              trigger: 'q-submit',
            },
            {
              id: 'qorderrefund',
              message: 'Sorry for the inconvenience. Go through the FAQ. If not solved Will check and update. Thank you',
              trigger: 'q-submit',
            },
            {
              id: 'qorder',
              message: 'Get My Orders',
              trigger: 'getOrders',
            },
            {
              id: 'getOrders',
              component: <GetAllOrders triggerNextStep  />,
              waitAction:true,
              trigger: 'q-submit',
            },
            {
              id: 'q-submit',
              message: 'Do you have any other questions !?',
              trigger: 'submit',
            },
            {
              id: 'submit',
              options: [
                { value: 'y', label: 'Yes', trigger: 'no-submit' },
                { value: 'n', label: 'No', trigger: 'end-message' },
              ],
            },
            {
              id: 'no-submit',
              options: [
                { value: 1, label: 'LogIn Issue ?', trigger: 'qlogin' },
                { value: 2, label: ' Register Issue ?', trigger: 'qlogin' },
                { value: 3, label: 'Order details', trigger: '5' },
                { value: 4, label: 'Connect with support', trigger: 'qsupport' },
              ],
            },
            {
              id: 'end-message',
              component: <Post />,
              asMessage: true,
              trigger: 'qtype',
            },
          ]}
          {...config}
        />
      </div>
      <div>
        
          <button className="chat-btn" onClick={() => startChat()}>
            <img src={chatIcon} alt='+' />
          </button>
      </div>
    </div>
  )
}

export default Chatbot