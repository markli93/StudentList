import React from 'react';
const uuidv1 = require('uuid/v1');

export default class StudentInfo extends React.Component{

    constructor(){
        super();

        this.state = {
            isHidden: true,
            tag:[]
        }
    }

    average = ()=>{
        let grades = this.props.grade
        let total = 0;
        for(var i = 0; i < grades.length; i++) {
            total += parseInt(grades[i]);
        }
        let average = (total / grades.length).toFixed(2);
        return average
    }
    
    display = ()=>{
        this.setState({
            isHidden:!this.state.isHidden
        })
    }

    addTag = (e)=>{
        var newTag = e.target.value
        if(e.key === 'Enter'){
            this.setState({
                tag: this.state.tag.concat(newTag)
            })
            this.props.addTag(this.props.id, newTag)
            
            e.target.value=''
        }
    }
    render(){
        
        return(
            <div className='info--container'>
                <div className='info__image'>
                    <img src={this.props.pic} alt="pic"/>
                </div>
                <div className="info__detail--container">
                    <div className ="info__name">
                        {this.props.first}  {this.props.last}
                    </div>
                    <div className="info__detail">
                        <div>
                            Email: {this.props.email}
                        </div>
                        <div>
                            Company: {this.props.company}
                        </div>
                        <div>
                            Skill: {this.props.skill}
                        </div>
                        <div>
                            Average: {this.average()}%
                        </div>
                        <div className='info__grade'>
                            {this.state.isHidden? null:
                                <div>
                                    {this.props.grade.map(item=>(
                                        <div key= {uuidv1()}>
                                            Test {parseInt(this.props.grade.indexOf(item))+ 1}: <span>{item}%</span>
                                        </div>
                                    ))}

                                    <div className='info__tag--container'>
                                        {this.props.tag.map(item=>(
                                            <div className='info__tag' key= {uuidv1()}>
                                                {item}
                                            </div>
                                        ))}
                                    </div> 
                                       
                                    <div className='info__input--container'>
                                        <input type='text' placeholder='Add a tag' onKeyPress={this.addTag}/>
                                    </div>
                                </div>
                            } 
                        </div>
                    </div>
                </div>
                <div onClick={this.display} className='info__expand'>
                    {this.state.isHidden? <div className='info__expand--icon'>+</div>:<div className='info__expand--icon'>–</div>}
                </div>
            </div>
        )
    }
}