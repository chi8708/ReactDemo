

    
 class CommentBox extends React.Component{
     constructor(props){
         super(props);
         this.state={data:[
                {id:1,Author:'张三',Text:'是更尴尬',CreateTime:'2017-11-08'},
                {id:2,Author:'老李',Text:'ok劳斯莱斯了',CreateTime:'2017-11-07'}
                ]
         }

     }
     handleCommentSubmit(comment){
        var comments = this.state.data;
        comment.CreateTime =Date.now();
        var newComments = comments.concat([comment]);
        this.setState({data:newComments});
        
     }
    render(){
        return(
         <div className="commentBox">
            <h1>评论</h1>
            <CommentList data={this.state.data}></CommentList>
            <CommentForm onCommentSubmit={(m)=>this.handleCommentSubmit(m)}></CommentForm>
         </div>
        );
    }
    }
    
    class CommentList extends React.Component{
     constructor(props){
        super(props);
        //commentNodes 作为属性传递(添加this.setState不会动态更新列表) 
        //render（会动态更新列表）方法中直接定义为变量
     }
     render(){
        var commentNodes=this.props.data.map(comment=>{
            return (
            <Comment Author={comment.Author}>
               <span> {comment.Text}</span>
            </Comment>
            );
        });
        return(
          <div className="CommentList">
               {commentNodes}
          </div>
        )
    }
    }
    
    class Comment extends React.Component{
        render(){
        return(
         <div className="Comment" style={{border:"1px solid #009900",marginBottom:"10px"}}>
            <h2 className="commentAuthor" style={{color:"#0000ff"}}>
              {this.props.Author}
             </h2>
             {this.props.children}
         </div>
        )
    }
    }

    
    class CommentForm extends React.Component{
        constructor(props){
            super(props);
            this.state={Author:'',Text:''};
        }
        handleSubmit(e){
            alert(this.state.Author);
            e.preventDefault();
            var author = this.state.Author.trim();
            var text = this.state.Text.trim();
            if (!text || !author) {
              return;
            }
            this.props.onCommentSubmit({Author: author, Text: text});
            this.setState({Author: '', Text: ''});
        }
        handleAuthorChange(e){
            this.setState({Author: e.target.value});
        }
        handleTextChange(e){
            this.setState({Text: e.target.value});
        }
        render(){
            return(
            <form className="commentForm" onSubmit={(e)=>this.handleSubmit(e)}>
                <div className="CommentForm">
                    author: <input type="text" value={this.state.Author}   onChange={e=>this.handleAuthorChange(e)}/>
                    text: <input type="text" value={this.state.Text}   onChange={e=>this.handleTextChange(e)}/>
                    <input type="submit" value="提交"/>
                </div>
                
            </form>
        )
    }
    }
    
    