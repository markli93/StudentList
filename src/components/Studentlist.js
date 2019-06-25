import React from 'react';
import axios from 'axios';
import StudentInfo from './Studentinfo'


export default class Studentlist extends React.Component{
    constructor(){
        super();

        this.state = {
            studentArry:[],
            searchName:'',
            searchTag:'',
            tag:[],
            id:0
        };
    }

    componentDidMount(){
        axios.get("https://www.hatchways.io/api/assessment/students").then(res=>{
            
            const student = res.data.students;

            student.forEach((item)=>{
                item.tags = [];
            })

            this.setState({
                studentArry:student
            })
        });  
    
    }

    addTag= (id,tag)=>{

        this.state.studentArry[id-1].tags.push(tag)

    }   

    searchByName = (e)=>{
        this.setState({
            searchName:e.target.value  
        })
    }

    searchByTag = (e)=>{
        this.setState({
            searchTag:e.target.value  
        })
    }

    

    render(){ 
        
        let searchResult = this.state.studentArry.filter(
            item =>{
                if(this.state.searchName !== ''){
                    return item.firstName.toLowerCase().indexOf(this.state.searchName.toLowerCase()) !== -1 || item.lastName.toLowerCase().indexOf(this.state.searchName.toLowerCase()) !== -1;   
                }
                else if(this.state.searchTag !== ''){
                    let string = item.tags.toString()
                    return string.toLowerCase().indexOf(this.state.searchTag.toLowerCase()) !== -1;
                }
                else{
                    return {item}
                }
            }
        )

        let filteredResult= searchResult.filter(
            item=>{
                if(this.state.searchName !== ''){
                    let string = item.tags.toString()
                    return string.toLowerCase().indexOf(this.state.searchTag.toLowerCase()) !== -1;
                }
                else if(this.state.searchTag !== ''){
                    return item.firstName.toLowerCase().indexOf(this.state.searchName.toLowerCase()) !== -1 || item.lastName.toLowerCase().indexOf(this.state.searchName.toLowerCase()) !== -1;   
                }
                else{
                    return {item}
                }    
            }
        )

        return(
            <div>
                <div>
                    <div className='search--container'>
                        <input type='text'placeholder="Search by Name" onChange={this.searchByName}/>
                    </div>
                    <div className='search--container'>
                        <input type='text'placeholder="Search by Tag" onChange={this.searchByTag}/>
                    </div>
                    {filteredResult.map(item =>(
                        <StudentInfo
                        first={item.firstName}
                        last={item.lastName}
                        email={item.email}
                        company={item.company}
                        skill={item.skill}
                        pic={item.pic}
                        city={item.city}
                        grade={item.grades}
                        key={item.id}
                        id={item.id}
                        tag={item.tags}
                        addTag={this.addTag}
                        />
                    ))}
                </div>
            </div>
        )
    }
}