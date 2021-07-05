import React, { useState, useRef } from 'react';
import { Modal, StyleSheet, Text, TouchableHighlight, View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { set } from 'react-native-reanimated';

const CustomPicker = (props) => {

    const { textStyle, defaultItem, items } = props;
    const [selectedItem, setSelectedItem] = useState('');
    const [show, setShow] = useState(false);

    const pickerRef = useRef();

    function open() {
        setShow(true);
    }

    function close() {
        setShow(false);
    }

    const onCancelPress = () => {
        setSelectedItem(defaultItem);
        close();
    }

    const onDonePress = () => {
        props.onItemChange(selectedItem);
        close();
    }

    const renderPicker = () => {
        return (
            <Picker
                    ref={pickerRef}
                    selectedValue={selectedItem}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedItem(itemValue)
                    }>
                    {
                        items.map(val => (
                            <Picker.Item label={val} value={val} />
                        ))
                    }    
                </Picker>

        );
    }

    return (
        <TouchableHighlight
            activeOpacity={0}
            onPress={() => open()}>
            <View>
                <View style={textStyle}>
                    <Text style={{ fontFamily: 'SFPro' }} >{selectedItem}</Text>
                </View>

                <Modal
                    transparent={true}
                    animationType='slide'
                    visible={show}
                    supportedOrientations={['portrait']}
                    onRequestClose={() => close()}>
                    <View style={{ flex: 1 }}>
                        <TouchableHighlight
                            style={{
                                flex: 1,
                                alignItems: 'flex-end',
                                flexDirection: 'row',
                            }}
                            activeOpacity={1}
                            visible={show}
                            onPress={() => close()}>
                            <TouchableHighlight
                                underlayColor={'#FFFFFF'}
                                style={{
                                    flex: 1,
                                    borderTopColor: '#E9E9E9',
                                    borderTopWidth: 1,
                                }}
                                >

                                <View style={{
                                    backgroundColor: '#FFFFFF',
                                    height: 256,
                                    overflow: 'hidden',
                                }}>
                                    <View style={{ marginTop: 20 }}>
                                        {renderPicker()}
                                    </View>

                                    <TouchableHighlight
                                        underlayColor={'transparent'}
                                        onPress={onCancelPress}
                                        style={[styles.btnText, styles.btnCancel]}>
                                        <Text>Cancel</Text>
                                    </TouchableHighlight>

                                    <TouchableHighlight
                                        underlayColor={'transparent'}
                                        onPress={onDonePress}
                                        style={[styles.btnText, styles.btnDone]}>
                                        <Text>Done</Text>
                                    </TouchableHighlight>
                                </View>

                            </TouchableHighlight>

                        </TouchableHighlight>

                    </View>

                </Modal>
            </View>

        </TouchableHighlight>
    );
}

CustomPicker.defaultProps = {
    textStyle: {},
    defaultItem: {},
    items: [],
    onItemChange: () => { },
}

const styles = StyleSheet.create({
    btnText: {
        position: 'absolute',
        top: 0,
        height: 42,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnCancel: {
        left: 0,
    },
    btnDone: {
        right: 0,
    }
})

export default CustomPicker;