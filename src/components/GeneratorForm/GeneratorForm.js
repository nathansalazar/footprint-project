import React, { Component } from 'react';
import { connect } from 'react-redux';

class GeneratorForm extends Component {

    state = {
        showGenerator: false,
        newGenerator: {
            generatorSize: 0,
            energyUnit: '',
            monthlyCost: 0,
        }
    }

    handleGeneratorToggle = () => {
        this.setState({
            ...this.state,
            showGenerator: !this.state.showGenerator
        });
    }

    handleChangeFor = property => event => {
        this.setState({
            ...this.state,
            newGenerator: {
                ...this.state.newGenerator,
                [property]: event.target.value,
            },
        });
    }

    handleAddGenerator = event => {
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_GENERATOR',
            payload: this.state.newGenerator,
        });
        this.setState({
            showGenerator: false,
        });
    }

    render() {
        return (
            <div>
                <h5>Do you have a generator(s)? Check box for 'yes'.</h5>
                <input
                    type="checkbox"
                    checked={this.state.showGenerator}
                    onChange={this.handleGeneratorToggle}
                />
                {this.state.showGenerator === true ? (
                    <React.Fragment>
                        <input
                            type="number"
                            placeholder="Generator Size"
                            value={this.state.newGenerator.generatorSize}
                            onChange={this.handleChangeFor('generatorSize')}
                        />
                        <select value={this.state.newGenerator.energyUnit} onChange={this.handleChangeFor('energyUnit')}>
                            <option value="">--Select Energy Unit--</option>
                            <option value="kVA">kVA</option>
                            <option value="kWh">kWh</option>
                        </select>
                        <br />
                        <input
                            type="number"
                            placeholder="Monthly Fuel Cost"
                            value={this.state.newGenerator.monthlyCost}
                            onChange={this.handleChangeFor('monthlyCost')}
                        />
                        <button
                            onClick={this.handleAddGenerator}
                        >
                            Add Generator
                    </button>
                    </React.Fragment>
                ) : (
                        null
                    )}


            </div>

        )
    }
}

const mapStateToProps = state => ({
    generator: state.generator,
});

export default connect(mapStateToProps)(GeneratorForm);