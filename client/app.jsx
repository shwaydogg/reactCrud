App = React.createClass({
  mixins: [ReactMeteorData],//Seems to only be needed for data retrieval (not updates)
  
  getMeteorData() {
    return {
      items: Items.find({}).fetch()
    }
  },

  renderItems() {
    return this.data.items.map((item) => {
      return <Item key={item._id} item={item} />;
    });
  },

  render() {return ( 
      <div className="container">
        <header>
          <h1>New Item</h1>
        </header>
        <ItemForm/>
        <ul>
          {this.renderItems()}
        </ul>
      </div>
  )}
});

ItemForm = React.createClass({
  getInitialState: function() {
    if(!this.props.item){
      this.item = new AstroItem();
      return {mode: 'new'};
    }
    else{
      this.item = this.props.item;
      return {mode: 'edit'};
    }
  },

  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    var title = React.findDOMNode(this.refs.titleInput).value.trim();
    var content = React.findDOMNode(this.refs.contentInput).value.trim();
    
    this.item.set({
      title: title,
      content: content
    });

    this.item.save();
 
    // Clear form
    if(this.state.mode == "new"){
      React.findDOMNode(this.refs.titleInput).value = "";
      React.findDOMNode(this.refs.contentInput).value = "";
    }else{
      this.props.onSave();
    }
  },

  render() {
    //var mode = this.state.mode;
    
    var item = this.item;
    return ( 
        <form onSubmit={this.handleSubmit}>
          {this.state.mode}
          <input
            type="text" 
            ref="titleInput"
            placeholder="title" 
            defaultValue={item.title}
          />
          <input
            type="text"
            ref="contentInput"
            placeholder="content"
            defaultValue={item.content}
            />

          <input type="submit" />
        </form>
  )}
});
