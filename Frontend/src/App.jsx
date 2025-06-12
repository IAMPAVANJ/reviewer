import './App.css'
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from 'react-simple-code-editor';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import MarkDown from 'react-markdown';
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Loader from './component/Loader/loader';
import Card from './component/card/Card';
import InstructionCard from './component/InstructionCard/InstructionCard';
import useServerConnection from './Hooks/useServerConnection';
function App() {
  const {serverConnection,maxTry} = useServerConnection();
  const [loading, setLoading] = useState(false);
  const [code,setCode] = useState("");
  const [show, setShow] = useState(false);
  const [review,setReview] = useState("");
  useEffect (() => {
    prism.highlightAll();
  }, []);

  useEffect(() => { 
    const started = sessionStorage.getItem("started");
    if(!started) {
      setShow(true);
    }
    return(()=>{
      if(started==="true"){
        sessionStorage.removeItem("started")
      }
    }) 
  },[])

  const reviewCode = async(e,count=1)=> {
    e.preventDefault();
    if(!code.trim()) {
      toast.error("Please enter some code to review.");
      return;
    }
    setLoading(true);
    try{
      const response = await axios.post('https://reviewer-bqf8.onrender.com/ai/getreview', { code }); 
      setReview(response.data.response);
    }catch(err) {
      if(count<=3){
        count++;
        reviewCode(e,count);
      }else{
        console.error(err);
        toast.error("An error occurred while reviewing the code.");
      }
    }finally{
      setLoading(false);
    }
  }

  return (
    <>
    <main>
      <div className='left'>
        <div className='code'>
          <Editor
          disabled={loading || serverConnection===false}
            value={code}
            onValueChange={setCode}
            highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
            padding={0}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              color: '#abb2bf',
              height: '100%',
              width: '100%',
              overflow: 'auto',
              borderRadius: '5px',
            }}
            placeholder='Paste your code here...'
          />
        </div>
        <button onClick={reviewCode} className='review'>{loading ? <Loader/> : "Review"}</button>
      </div>
      <div className='right' style={{
        display: review=="" ? 'flex' : "",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {show && <Card serverConnection={serverConnection} maxTry={maxTry} setShow={setShow}/>}
        
             {review=="" && !show ? <InstructionCard/> : <MarkDown
              rehypePlugins={[rehypeHighlight]}
            >
              {review}
            </MarkDown>}
      </div>
    </main>
    <Toaster position="top-center"
    reverseOrder={false}
    toastOptions={{
      duration:2000,
    }}
  />
    </>
  )
}

export default App
