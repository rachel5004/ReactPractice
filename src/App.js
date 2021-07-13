import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm'
import PhoneInfoList from './components/PhoneInfoList'

class App extends Component {
  id=2;
  state = {
    information: [
      {
        id:0,
        name:'홍길동',
        phone:'010-1234-5678'
      },
      {
        id:1,
        name:'장유정',
        phone:'010-1234-0000'
      }
    ],
    keyword: ''
  }
  handleChange = (e) => {
    this.setState({
      keyword: e.target.value,
    });
  }
  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({ id: this.id++, ...data})
    })
    // console.log(data);
  }
  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    })
  }
  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(
        info => id ===info.id
        ? { ...info, ...data}  // 새 객체를 생성, 기존값과 새 데이터를 덮어씀
        : info  // 기존 값 유지
      )
    })
  }
  render() {
    const {information, keyword} = this.state;
    const filteredList = information.filter(
      info => info.name.indexOf(keyword) !== -1 // 존재하지 않으면 -1 반환
    );
    return (
      <div>
        <PhoneForm 
          onCreate={this.handleCreate}
        />
        <p>
          <input
            placeholder="검색할 단어를 입력하세요"
            onChange={this.handleChange}
            value={keyword}
          />
        </p>
        <PhoneInfoList
          data={filteredList}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
