import { useEffect, useState } from "react";
import { FaBold, FaItalic, FaUnderline, FaAlignLeft, FaAlignCenter, 
  FaAlignRight, FaPlus, FaMinus  } from 'react-icons/fa';
import './editor.css';

export const Editor = () => {
  const [text, setText] = useState('');
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [align, setAlign] = useState<'left' | 'right' | 'center'>('left');
  const [font, setFont] = useState(16);
  const [Analysis, setAnalysis] = useState({});

  useEffect(() => {
    if(Object.keys(Analysis).length === 0 ) return;
    analyzing()
  }, [bold, italic, underline, align, font])
  

  const changeBold = ()=> {
    setBold((prevBold)=> !prevBold);
    // const textarea = document.getElementById("editor-textarea") as HTMLTextAreaElement | null;

    // if (textarea) {
      // bold ? textarea.style.fontWeight = "bold" : textarea.style.font = 'normal';
      // const selectionStart = textarea?.selectionStart;
      // const selectionEnd = textarea?.selectionEnd;

      // if(selectionStart === selectionEnd) {
      //   const newText = bold ? text.replace(/\*\*/g, "") : `**${text}**`;
      //   setText(newText);
      // } else {
      //   const selectedText = text.substring(selectionStart, selectionEnd);
      //   const beforeText = text.substring(0, selectionStart);
      //   const afterText = text.substring(selectionEnd);
  
      //   const newText = bold
      //     ? beforeText + selectedText.replace(/\*\*/g, "") + afterText
      //     : beforeText + `**${selectedText}**` + afterText;
  
      //   setText(newText);
      // }
    // }
    
  }
  const changeUnderline = ()=> {
    setUnderline((prevUnderline)=> !prevUnderline)
  }
  const changeItalic = ()=> {
    setItalic((prevItalic)=> !prevItalic);
  }
  const changeAlign = (align: 'left' | 'right' | 'center')=> {
    setAlign(align)
  }
  const changeFont = (increase =  0)=> {
    if(increase === 1){
      setFont((prevFont)=> prevFont + 1)
    } else {
      setFont((prevFont)=> prevFont - 1)
    }
  }
  
  const analyzing = ()=> {

    if(text === '') return setAnalysis({})

    setAnalysis({
      cantLetters: (text.match(/[a-zA-Z]/g) || []).length,
      cantWords: (text.match(/\b\w+\b/g) || []).length, 
      cantSpaces: (text.match(/ /g) || []).length,
      cantSpecialCharacters: (text.match(/[^\w\s]/g) || []).length,
      bold,
      underline, 
      align,
      font,
      italic
    })
  }

  const reset = ()=> {
    setText('');
    setBold(false);
    setItalic(false);
    setUnderline(false);
    setAlign('left');
    setFont(16);
    setAnalysis({})
  }

  let styles = {
    fontWeight: bold ? 'bold' : 'normal', 
    textAlign: align,
    fontSize : font,
    textDecoration: underline ? 'underline' : 'none',
    fontStyle: italic ? 'italic' : 'normal',
    // resize: 'none' as 'none'
  }
 
  const boolButtonsStyle = (value: boolean)=> {
    return {
      backgroundColor: value ? 'green' : '#f9f9f9', color: value ? 'white' : '#000000'
    }
  }


  return (

    <div className="editor">
        <h1 className="title-editor">Sebaser99 Editor</h1>
        <div className="editor-buttons">
          <button style={boolButtonsStyle(bold)} onClick={changeBold}><FaBold  title="bold"/></button>
          <button style={boolButtonsStyle(italic)} onClick={changeItalic}><FaItalic title="Italic" /></button>
          <button style={boolButtonsStyle(underline)} onClick={changeUnderline}><FaUnderline title="Underline" /></button>
          <button style={{backgroundColor: align === 'left' ? 'green' : '#f9f9f9', color: align === 'left' ? 'white' : '#000000'}} onClick={()=>changeAlign('left')}><FaAlignLeft title="Align Left" /></button>
          <button style={{backgroundColor: align === 'center' ? 'green' : '#f9f9f9', color: align === 'center' ? 'white' : '#000000'}} onClick={()=>changeAlign('center')}><FaAlignCenter title="Align Center" /></button>
          <button style={{backgroundColor: align === 'right' ? 'green' : '#f9f9f9', color: align === 'right' ? 'white' : '#000000'}} onClick={()=>changeAlign('right')}><FaAlignRight title="Align Right" /></button>
          <button onClick={()=>changeFont(1)}><FaPlus title="A+" /></button>
          <button onClick={()=>changeFont()}><FaMinus title="A-" /></button>
        </div>
        <textarea 
          onChange={(e)=>setText(e.target.value)} 
          style={styles}
          value={text} name="editor-textarea" 
          id="editor-textarea" 
          cols={70}
          rows={10}
          className="editor-textarea"
          placeholder="Escribe tu texto..."
        >

        </textarea>
        <div className="editor-buttons">
        <button onClick={reset}>Resetear</button>
        <button onClick={analyzing}>Analizar</button>
        </div>
        <textarea 
        onChange={()=>{}} 
        value={Object.keys(Analysis).length !== 0 ?JSON.stringify(Analysis, null, 2) : "No hay data"} name="analysis-textarea" 
        id="analysis-textarea" 
        cols={70}
        rows={10}
        className="analysis-textarea"
        >

        </textarea>
    </div>
  )
}
