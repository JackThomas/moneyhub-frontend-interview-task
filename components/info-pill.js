import styled from "styled-components";
import PropTypes from "prop-types";

// This is an example component
// You shouldn't need to make any changes here
const Pill = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
text-align: center;
padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.m};
margin: 0;
margin-right: ${({ theme }) => theme.space.m};
border-radius: ${({ theme }) => theme.space.m};
font-size: ${({ theme }) => theme.typography.xs.fontSize};
background-color: ${({ theme, type }) => type && theme.colors[type].default};
color: ${({ theme, type }) => type && theme.colors[type].text};
font-weight: 700;
`;

const InfoPill = ({ children, type }) => (
    <Pill type={type}>
        {children}
    </Pill>
)

InfoPill.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(["positive", "negative"]),
}

export default InfoPill