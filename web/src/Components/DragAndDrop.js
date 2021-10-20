import React, { Component } from 'react';

export default class DragAndDrop extends Component {
    constructor(props) {
        super(props);
        this.dragCounter = 0;
        this.state = {
          dragging: false
        };
      }

    dropRef = React.createRef();

    handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter++;
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.setState({
                dragging: true
            });
          }
    }

    handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter--;
        if (this.dragCounter > 0) {
            this.setState({
                dragging: false
            });
        }
    }

    handleDrop = (e) => {
        const {
            handleDrop
        } = this.props;
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            dragging: false
        });
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleDrop(e.dataTransfer.files);
            e.dataTransfer.clearData()
            this.dragCounter = 0
        }
    }

    componentDidMount() {
        let div = this.dropRef.current
        div.addEventListener('dragenter', this.handleDragIn);
        div.addEventListener('dragleave', this.handleDragOut);
        div.addEventListener('dragover', this.handleDrag);
        div.addEventListener('drop', this.handleDrop);
      }

      componentWillUnmount() {
        let div = this.dropRef.current
        div.removeEventListener('dragenter', this.handleDragIn)
        div.removeEventListener('dragleave', this.handleDragOut)
        div.removeEventListener('dragover', this.handleDrag)
        div.removeEventListener('drop', this.handleDrop)
      }

  render() {
      const {
      children,
      style
      } = this.props;
      const {
        dragging
      } = this.state;
    return (
     <div
        ref={this.dropRef}
        style={{display: 'inline-block', position: 'relative', ...style}}
    >
         {dragging &&
          <div 
            style={{
              border: 'dashed grey 4px',
              backgroundColor: 'rgba(255,255,255,.8)',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0, 
              right: 0,
              zIndex: 9999
            }}
          >
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                right: 0,
                left: 0,
                textAlign: 'center',
                color: 'grey',
                fontSize: 36
              }}
            >
              <div>drop here :)</div>
            </div>
          </div>
        }
        {children}
      </div>
    );
  }
}
