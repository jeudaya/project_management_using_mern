import React ,{Component} from 'react';


class Form extends Component{

constructor(){
    super()
    this.state={
        tasks:[],
        text:"Hello World!!"
    }  
}


clickFunction()
{
    console.log("Add this Value to Array",this.refs.task.value)
    var o={
        "task":this.refs.task.value,
        "no":1
    }
    this.state.tasks.push(o)
    console.log("Add this Value to Array",this.state)
    this.setState({
      text: "Change Title",
      tasks:this.state.tasks
    });
}




render()
{
    var tasks=this.state.tasks
        return(
            <div>
            <h2>--{this.state.text}--</h2>
            <input type="text" ref="task" placeholder="Enter Task" />
            <button onClick={this.clickFunction.bind(this)}>Change Title!</button>
            <li>{JSON.stringify(tasks)}</li>
            </div>
            );
    }
}

export default Form;