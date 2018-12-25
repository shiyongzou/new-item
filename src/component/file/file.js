import React,{ Component } from 'react';
import '../../sass/file.scss';

const formData= new FormData();
const reader = new FileReader();
class File extends Component {
    constructor(props){
        super(props)
            this.state={
             imgUrl:[],
            }
    }
    fileChange=(e)=>{
        // const e=e||window.event;
        e.preventDefault()
        const files=e.target.files;
        const { imgUrl }=this.state
        console.log(files.length)
        if(files.length > 0){
            const this_=this;
            [].slice.call(files).forEach(function(value,index){
              formData.append(value,value.name) //遍历添加数据
              reader.readAsDataURL(e.target.files[0])
              reader.onload=()=>{
                    this_.setState({
                        imgUrl:imgUrl.push(reader.result)
                    })
                    }
            
            })
          }else {
            alert('请先选择图片');
            return false;
          }
          console.log(this.state.imgUrl)
    } 

    render () {
    
       return(
        <div>
            <header className="App-header">
            <h1>上传文件</h1> 
            </header>
            <div className='files'>
                 点击上传文件
                <input type='file' id='fileInput' onChange={this.fileChange.bind(this)}/> 
            </div>
            {/* <ul>
                {
                    this.state.imgUrl.map((item,index)=>(
                        <li key={index}>
                            <img src={item} alt=""/>
                        </li>
                    ))
                }
            </ul> */}
        </div>
       );
    }
}
export default File;