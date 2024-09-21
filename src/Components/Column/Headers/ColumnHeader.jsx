import React from 'react';

const ColumnHeader = ({ imgSrc, title, itemCount }) => {
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <img src={imgSrc} alt="Urgent Icon" style={styles.icon} />
                <span style={styles.title}>{title}</span>
                <span style={styles.itemCount}>{itemCount}</span>
            </div>
            <div style={styles.actions}>
            <img src={'/icons_FEtask/add.svg'} alt="Urgent Icon" style={styles.icon} />
            <img src={'/icons_FEtask/3 dot menu.svg'} alt="Urgent Icon" style={styles.icon} />
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f7f8fa',
        padding: '10px',
        borderRadius: '8px',
        marginBottom: '10px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        width: '24px',
        height: '24px',
        marginRight: '8px',
    },
    title: {
        fontWeight: 'bold',
        fontSize: '16px',
        marginRight: '8px',
    },
    itemCount: {
        color: '#888',
        fontSize: '14px',
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '50%',
        width: '24px',
        height: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        fontSize: '18px',
    },
};

export default ColumnHeader;
