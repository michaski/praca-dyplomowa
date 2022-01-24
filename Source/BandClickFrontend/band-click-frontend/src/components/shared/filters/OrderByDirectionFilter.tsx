import React, { useState } from "react";
import { Form, FormGroup, Row, Col } from "react-bootstrap";
import { OrderByDirection } from "../../../models/Filters/QueryFilters";

interface OrderByDirectionFilterProps {
    onOrderByDirectionChanged: Function
}

const OrderByDirectionFilter: React.FC<OrderByDirectionFilterProps> = ({onOrderByDirectionChanged}) => {

    const [orderByDirection, setOrderByDirection] = useState(undefined as OrderByDirection | undefined);

    const stringToOrderByDirection = (valueToParse: string): OrderByDirection | undefined => {
        switch (valueToParse) {
            case '1':
                return OrderByDirection.ASC;
            case '2':
                return OrderByDirection.DESC;
            default:
                return undefined;
        }
    }
    
    return (
    <>
    <FormGroup as={Row} className="my-2">
        <Form.Label column sm="4">
            Kolejność
        </Form.Label>
        <Col sm="8">
            <Form.Select id={'type-select'} aria-label="Rodzaj" value={orderByDirection} onChange={e => {
                const selectedValue = stringToOrderByDirection(e.target.value);
                setOrderByDirection(selectedValue);
                onOrderByDirectionChanged(selectedValue);
            }}>
                <option value={undefined}>Domyślnie</option>
                <option value={OrderByDirection.ASC}>Rosnąco</option>
                <option value={OrderByDirection.DESC}>Malejąco</option>
            </Form.Select>
        </Col>
    </FormGroup>
    </>
    );
}

export default OrderByDirectionFilter;
