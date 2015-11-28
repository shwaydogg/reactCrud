Item = React.createClass({
  getInitialState: function() {
    return {mode: 'view'};
  },
  handleEdit() {
    event.preventDefault();
    this.setState({mode: 'edit'});
  },
  render() {
    //var self = this;
    //console.log("in Item render", this);
    var item;
    if(this.state.mode == 'view' ){
      item = 
        <div className="itemView">
          <div>Title: {this.props.item.title}</div>
          <div>Content: {this.props.item.content}</div>
          <button onClick={this.handleEdit}>Edit</button>
          <DeleteBtn item={this.props.item}/>
        </div>
    }else{
      var onSave = ()=>{
        this.setState({mode: 'view'});
      };
      
      item = <ItemForm item={this.props.item} onSave={onSave}/>;
    }
    return (
      <li>
        {item}
      </li>
    );
  }
});


