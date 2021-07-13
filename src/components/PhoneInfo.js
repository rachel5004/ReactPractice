import React, { Component } from 'react';
import PhoneForm from './PhoneForm';

class PhoneInfo extends Component {
    static defaultProps = {
        info: {
            name: '이름',
            phone: '010-0000-0000',
            id: 0
        }
    }
    state = {
        editing: false,  // 수정 버튼을 누르면 true로 변경, text -> input
        // input을 담기 위한 필드
        name: '',
        phone: ''
    }
    handleRemove = () => {
        // 삭제버튼 클릭시 onRemove에 id를 넣어서 호출
        const { info, onRemove } = this.props;
        onRemove(info.id);
    }
    handleToggleEdit = () => {
        const { editing } = this.state;
        this.setState({ editing: !editing });
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    componentDidUpdate(prevProps,prevState) {
        // 수정을 누르면 기존값이 input에 나타나고, 적용하면 input value를 부모에 전달
        const { info, onUpdate } = this.props;
        if(!prevState.editing && this.state.editing) {
            // editing: false -> true
            this.setState({
                name: info.name,
                phone: info.phone
            })
        }
        if(prevState.editing && !this.state.editing) {
            onUpdate(info.id, {
                name: this.state.name,
                phone: this.state.phone
            });
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (!this.state.editing
            && !nextState.editing
            && nextProps.info ===  this.props.info) {
                return false;
            }
        return true;
    }
    render() {
        console.log('render Phoneinfo '+this.props.info.id);
        const style = {
            border: '1px solid black',
            padding: '8px',
            margin: '8px'
        };
        const { editing } = this.state;

        const {
            name, phone, id
        } = this.props.info;
        
        // 수정모드
        if(editing){
            return (
                <div style={style}>
                    <div>
                        <input
                            value={this.state.name}
                            name="name"
                            placeholder="이름"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <input
                            value={this.state.phone}
                            name="phone"
                            placeholder="전화번호"
                            onChange={this.handleChange}
                        />
                    </div>
                    <button onClick={this.handleRemove}>삭제</button>
                    <button onClick={this.handleToggleEdit}>적용</button>
                </div>
            )
        }

        // 일반모드
        return (
            <div style={style}>
              <div><b>{name}</b></div>
              <div>{phone}</div>
              <button onClick={this.handleToggleEdit}>수정</button>
              <button onClick={this.handleRemove}>삭제</button>
            </div>
          );
        
    }
}
export default PhoneInfo;