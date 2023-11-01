import '../../../../style/Customer/ViewSPCard.css';
import Pagination from 'react-bootstrap/Pagination';
import ViewSPCard from './ViewSPCard';
import Row from 'react-bootstrap/esm/Row';
import BgImage from '../../../../assets/images/header/Background.png';

function BodyPageCus() {

    return (
        <div className="bodyPageContainer-SP">
            <Row id='bodyPageRow1'>
                <div className="SPCardContainer" >
                    <ViewSPCard />
                    <ViewSPCard />
                    <ViewSPCard />
                    <ViewSPCard />

                </div>
            </Row>
            <Row id='bodyPageRow2'>
                <div className="paginationContainer-SP" >
                    <Pagination className='pagination-element'>
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Item active>{1}</Pagination.Item>
                        <Pagination.Item>{2}</Pagination.Item>
                        <Pagination.Item>{3}</Pagination.Item>
                        <Pagination.Item>{4}</Pagination.Item>
                        <Pagination.Item>{5}</Pagination.Item>
                        <Pagination.Ellipsis />
                        <Pagination.Next />
                        <Pagination.Last />
                    </Pagination>
                </div>
            </Row>
        </div>
    );

}

export default BodyPageCus;