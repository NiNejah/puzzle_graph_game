//puzzle functions :

// Verification type Abstract
// Important (id) is integer !
export function isCorner(id, nbColon, nbRow) {
    if (id < 1 || id > nbColon * nbRow) console.log("invalid id arg in isCorner function !");
    return id === 1 || id === nbColon || id === (nbRow * (nbColon - 1)) + 1 || id === (nbRow * nbColon);
}

export function isLeftBorder(id, nbColon) {
    if (id < 1) console.log("invalid id arg in isLeftBorder function !");
    return id % nbColon === 1;
}

export function isRightBorder(id, nbColon) {
    if (id < 1) console.log("invalid id arg in isRightBorder function !");
    return id % nbColon === 0;
}

export function isTobBorder(id, nbColon) {
    if (id < 1) console.log("invalid id arg in isTobBorder function !");
    return id > 1 && id < nbColon;
}

export function isBottomBorder(id, nbColon, nbRow) {
    if (id < 1 || id > nbColon * nbRow) console.log("invalid id arg in isBottomBorder function !");
    return id > (nbRow * (nbColon - 1)) + 1 && id < nbRow * nbColon;
}

export function isBorder(id, nbColon, nbRow) {
    if (id < 1 || id > nbColon * nbRow) console.log("invalid id arg in isBorder function !");
    return (
        isLeftBorder(id, nbColon) ||
        isRightBorder(id, nbColon) ||
        isTobBorder(id, nbColon) ||
        isBottomBorder(id, nbColon, nbRow));
}

export function isInternalCells(id, nbColon, nbRow) {
    if (id < 1 || id > nbColon * nbRow) console.log("invalid id arg in isInternalCells function !");
    return !(isBorder(id, nbColon, nbRow) || isCorner(id, nbColon, nbRow));
}

// id is a String :
export function isConnected(id1, id2) {
    return (
        alreadyLinked(id1 + '_' + id2) ||
        alreadyLinked(id2 + '_' + id1));
}


////////////////////////////////////////////////////
///////////////////// TESTS \\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////////////////////////////////


export function cornersTests(id, nbColon, nbRow, nbLinks) {
    // test if the element has not enough, or to many links :
    if (nbLinks !== 2) return false;
    switch (id) {
        case 1:
            return isConnected(id, 2) && isConnected(id, (nbColon + 1));
        case nbColon:
            return isConnected(id, (id - 1)) && isConnected(id, (id + nbColon));
        case (nbRow * (nbColon - 1)) + 1:
            return isConnected(id, (id - nbColon)) && isConnected(id, (id + 1));
        case nbRow * nbColon:
            return isConnected(id, (id - nbColon)) && isConnected(id, (id - 1));
        default:
            console.log("switch finished with default in cornerTests fun ");
            break;
    }
    return false;

}

export function borderTest(id, nbColon, nbRow, nbLinks) {
    if (nbLinks !== 3) return false;

    if (isTobBorder(id, nbColon)) {
        return (
            isConnected(id, (id - 1)) &&
            isConnected(id, (id + 1)) &&
            isConnected(id, (id + nbColon))
        );
    }
    if (isRightBorder(id, nbColon)) {
        return (
            isConnected(id, (id - nbColon)) &&
            isConnected(id, (id + nbColon)) &&
            isConnected(id, (id - 1))
        );
    }
    if (isBottomBorder(id, nbColon, nbRow)) {
        return (
            isConnected(id, (id - 1)) &&
            isConnected(id, (id + 1)) &&
            isConnected(id, (id - nbColon))
        );
    }
    if (isLeftBorder(id, nbColon)) {
        return (
            isConnected(id, (id - nbColon)) &&
            isConnected(id, (id + 1)) &&
            isConnected(id, (id + nbColon))
        );
    }
}

export function internalTest(id, nbColon, nbRow, nbLinks) {
    if (nbLinks !== 4) return false;
    return (
        isConnected(id, (id - nbColon)) &&
        isConnected(id, (id + 1)) &&
        isConnected(id, (id + nbColon)) &&
        isConnected(id, (id - 1))
    );
}
