import React,{Component} from 'react';
import {Table} from 'react-bootstrap';


export class Studentet extends Component{

    constructor(props){
        super(props);
        this.state={stu:[]}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'student')
        .then(response => response.json())
        .then(data=>{
            this.setState({stu: data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }


    render(){

        const {stu}=this.state;
        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>ID e Studentit</th>
                        <th>Emri</th>
                        <th>Mbiemri</th>
                        <th>Mosha</th>
                        <th>Gjinia</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stu.map(st=>
                            <tr key={st.IDs}>
                                <td>{st.IDs}</td>
                                <td>{st.Emri}</td>
                                <td>{st.Mbiemri}</td>
                                <td>{st.Mosha}</td>
                                <td>{st.Gjinia}</td>
                            </tr>)}
                    </tbody>
                </Table>
            </div>
        )
    }
}




export default Studentet
