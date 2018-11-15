import React, { Component } from 'react';
import { connect } from 'react-redux';
import GeneratorList from '../GeneratorList/GeneratorList';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';

class GeneratorForm extends Component {

    state = {
        generator: false, // property relating to if the user DOES have a generator
        noGenerator: false, // property relating to if the user DOES NOT have a generator
        newGenerator: {
            generatorSize: '',
            energyUnit: '',
            monthlyCost: '',
        },
        energyBudget: '',
    }

    handleHasGeneratorToggle = () => {
        this.setState({
            ...this.state,
            noGenerator: false,
            generator: !this.state.generator,
            energyBudget: '',
        });
    }

    handleNoGeneratorToggle = () => {
        this.setState({
            ...this.state,
            generator: false,
            noGenerator: !this.state.noGenerator,
            newGenerator: {
                generatorSize: '',
                energyUnit: '',
                monthlyCost: '',
            },
        })
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

    handleChangeForEnergy = event => {
        this.setState({
            ...this.state,
            energyBudget: event.target.value,
        });
    }

    handleAddGenerator = event => {
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_GENERATOR',
            payload: this.state.newGenerator,
        });
        this.setState({
            newGenerator: {
                generatorSize: '',
                energyUnit: '',
                monthlyCost: '',
            }
        });
    }

    handleAddEnergyBudget = event => {
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_ENERGY_BUDGET',
            payload: this.state.energyBudget
        });
    }

    render() {
        return (
            <div>
                <div>
                    <p>Do you currently have a generator?</p>
                    <InputLabel htmlFor={this.state.generator.toString()}>Yes</InputLabel>
                    <Checkbox
                        checked={this.state.generator}
                        onChange={this.handleHasGeneratorToggle}
                    />
                    <InputLabel htmlFor={this.state.noGenerator.toString()}>No</InputLabel>
                    <Checkbox
                        checked={this.state.noGenerator}
                        onChange={this.handleNoGeneratorToggle}
                    />
                </div>
                <br />
                {this.state.generator === true ? (
                    <React.Fragment>
                        <InputLabel htmlFor={this.state.newGenerator.generatorSize}>Generator Size</InputLabel>
                        <Input
                            type="text"
                            placeholder="Enter Load Size"
                            value={this.state.newGenerator.generatorSize}
                            onChange={this.handleChangeFor('generatorSize')}
                        />
                        <InputLabel htmlFor={this.state.newGenerator.energyUnit}>Generator Energy Unit</InputLabel>
                        <Select value={this.state.newGenerator.energyUnit} onChange={this.handleChangeFor('energyUnit')}>
                            <MenuItem value="">--Select Energy Unit--</MenuItem>
                            <MenuItem value="kVA">kVA</MenuItem>
                            <MenuItem value="kW">kW</MenuItem>
                        </Select>
                        <br />
                        <InputLabel htmlFor={this.state.newGenerator.monthlyCost}>Monthly Fuel Cost (USD $)</InputLabel>
                        <Input
                            type="text"
                            placeholder="Monthly Fuel Cost"
                            value={this.state.newGenerator.monthlyCost}
                            onChange={this.handleChangeFor('monthlyCost')}
                        />
                        <Button
                            variant="raised"
                            color="primary"
                            onClick={this.handleAddGenerator}
                        >
                            Add Generator
                    </Button>
                        {this.props.sites.generatorSize !== null ? (
                            <GeneratorList />
                        ) : (
                                null
                            )}
                    </React.Fragment>
                ) : (
                        null
                    )}
                {this.state.noGenerator === true ? (
                    <React.Fragment>
                        <InputLabel htmlFor={this.state.energyBudget}>Monthly Energy Budget (USD $)</InputLabel>
                        <Input
                            type="text"
                            placeholder="Enter a monthly energy budget"
                            value={this.state.energyBudget}
                            onChange={this.handleChangeForEnergy}
                        />
                        <Button
                            variant="raised"
                            color="primary"
                            onClick={this.handleAddEnergyBudget}
                        >
                            Add Monthly Energy Budget
                    </Button>
                    </React.Fragment>
                ) : (
                        null
                    )}
            </div>

        )
    }
}

const mapStateToProps = state => ({
    sites: state.sites,
    generator: state.generator,
});

export default connect(mapStateToProps)(GeneratorForm);