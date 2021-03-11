input.onButtonPressed(Button.A, function () {
    if (Mode == 0) {
        Mode = 1
    }
    basic.showLeds(`
        . . # . .
        . . # . .
        # . # . #
        # . . . #
        # # # # #
        `)
})
let Mode = 0
radio.setGroup(1)
radio.setTransmitPower(7)
basic.showLeds(`
    # . . . #
    # # . # #
    # # # # #
    . # # # .
    . . # . .
    `)
Mode = 0
let userID = 1
basic.forever(function () {
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 255)
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 255)
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 255)
        }
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
            if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
            } else {
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
            }
        }
    }
    if (Mode == 1) {
        radio.sendString("A" + "," + ("" + userID) + "," + ("" + input.acceleration(Dimension.X)) + "," + ("" + input.acceleration(Dimension.Y)) + "," + ("" + input.acceleration(Dimension.Z)))
        radio.sendString("N" + "," + ("" + userID) + "," + ("" + input.compassHeading()))
    }
})
