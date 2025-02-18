/// <reference types="@dcl/posix" />
/// <reference types="env" />

/**
 * @public
 */
declare enum ActionButton {
    POINTER = "POINTER",
    PRIMARY = "PRIMARY",
    SECONDARY = "SECONDARY",
    ANY = "ANY",
    FORWARD = "FORWARD",
    BACKWARD = "BACKWARD",
    RIGHT = "RIGHT",
    LEFT = "LEFT",
    JUMP = "JUMP",
    WALK = "WALK",
    ACTION_3 = "ACTION_3",
    ACTION_4 = "ACTION_4",
    ACTION_5 = "ACTION_5",
    ACTION_6 = "ACTION_6"
}

/**
 * Defines angle representation
 * @public
 */
declare class Angle {
    private _radians;
    /**
     * Creates an Angle object of "radians" radians (float).
     */
    constructor(radians: number);
    /**
     * Gets a new Angle object valued with the angle value in radians between the two given vectors
     * @param a - defines first vector
     * @param b - defines second vector
     * @returns a new Angle
     */
    static BetweenTwoPoints(a: Vector2, b: Vector2): Angle;
    /**
     * Gets a new Angle object from the given float in radians
     * @param radians - defines the angle value in radians
     * @returns a new Angle
     */
    static FromRadians(radians: number): Angle;
    /**
     * Gets a new Angle object from the given float in degrees
     * @param degrees - defines the angle value in degrees
     * @returns a new Angle
     */
    static FromDegrees(degrees: number): Angle;
    /**
     * Get value in degrees
     * @returns the Angle value in degrees (float)
     */
    degrees(): number;
    /**
     * Get value in radians
     * @returns the Angle value in radians (float)
     */
    radians(): number;
}

/** @public */
declare type AnimationParams = {
    looping?: boolean;
    speed?: number;
    weight?: number;
    layer?: number;
};

/**
 * @public
 */
declare class AnimationState extends ObservableComponent {
    /**
     * Name of the animation in the model
     */
    readonly clip: string;
    /**
     * Does the animation loop?, default: true
     */
    looping: boolean;
    /**
     * Weight of the animation, values from 0 to 1, used to blend several animations. default: 1
     */
    weight: number;
    /**
     * Is the animation playing? default: true
     */
    playing: boolean;
    /**
     * Does any anyone asked to reset the animation? default: false
     */
    shouldReset: boolean;
    /**
     * The animation speed
     */
    speed: number;
    /**
     * Layering allows you to have two or more levels of animation on an object's parameters at the same time
     */
    layer: number;
    constructor(clip: string, params?: AnimationParams);
    /**
     * Sets the clip parameters
     */
    setParams(params: AnimationParams): this;
    toJSON(): any;
    /**
     * Starts the animation
     */
    play(reset?: boolean): void;
    /**
     * Pauses the animation
     */
    pause(): void;
    /**
     * Resets the animation state to the frame 0
     */
    reset(): void;
    /**
     * Resets and pauses the animation
     */
    stop(): void;
}

/**
 * @public
 */
declare class Animator extends Shape {
    private states;
    /**
     * Adds an AnimationState to the animation lists.
     */
    addClip(clip: AnimationState): this;
    /**
     * Gets the animation clip instance for the specified clip name.
     * If the clip doesn't exist a new one will be created.
     */
    getClip(clipName: string): AnimationState;
    /**
     * Resets and pauses the animation state, if the clip is null it will stop all animations on this animator
     */
    stop(clip?: AnimationState): void;
    /**
     * Starts the animation
     */
    play(clip: AnimationState, reset?: boolean): void;
    /**
     * Pauses the animation state, if the clip is null it will pause all animations on this animator
     */
    pause(clip?: AnimationState): void;
}

/**
 * This represents an arc in a 2d space.
 * @public
 */
declare class Arc2 {
    /** Defines the start point of the arc */
    startPoint: Vector2;
    /** Defines the mid point of the arc */
    midPoint: Vector2;
    /** Defines the end point of the arc */
    endPoint: Vector2;
    /**
     * Defines the center point of the arc.
     */
    centerPoint: Vector2;
    /**
     * Defines the radius of the arc.
     */
    radius: number;
    /**
     * Defines the angle of the arc (from mid point to end point).
     */
    angle: Angle;
    /**
     * Defines the start angle of the arc (from start point to middle point).
     */
    startAngle: Angle;
    /**
     * Defines the orientation of the arc (clock wise/counter clock wise).
     */
    orientation: Orientation;
    /**
     * Creates an Arc object from the three given points : start, middle and end.
     * @param startPoint - Defines the start point of the arc
     * @param midPoint - Defines the midlle point of the arc
     * @param endPoint - Defines the end point of the arc
     */
    constructor(
    /** Defines the start point of the arc */
    startPoint: Vector2,
    /** Defines the mid point of the arc */
    midPoint: Vector2,
    /** Defines the end point of the arc */
    endPoint: Vector2);
}

/** @public */
declare type Area = {
    box: Vector3;
};

/**
 * Entities can be attached to each other by using the `setParent` method. However, there are cases where we might want to attach entities
 * to other objects that are not entities created by the same scene (for example, the player's avatar). For those cases, we have this class.
 * @public
 */
declare abstract class Attachable {
    /** Used to attach entities to the avatar. Entities will follow the avatar when it moves */
    static readonly AVATAR: Attachable;
    /** Used to attach entities to the camera. When in first person mode, the attached entities will also rotate with the camera */
    static readonly FIRST_PERSON_CAMERA: Attachable;
}

/**
 * @public
 */
declare class AudioClip extends ObservableComponent {
    readonly url: string;
    /**
     * Is this clip looping by default?
     */
    loop: boolean;
    /**
     * Clip's master volume. This volume affects all the AudioSources.
     * Valid ranges from 0 to 1
     */
    volume: number;
    constructor(url: string);
}

/**
 * @public
 */
declare class AudioSource extends ObservableComponent {
    readonly audioClip: AudioClip;
    readonly audioClipId: string;
    /**
     * Is this clip looping by default?
     */
    loop: boolean;
    /**
     * Clip's master volume. This volume affects all the AudioSources.
     * Valid ranges from 0 to 1
     */
    volume: number;
    /**
     * Is this AudioSource playing?
     */
    playing: boolean;
    /**
     * Pitch, default: 1.0, range from 0.0 to MaxFloat
     */
    pitch: number;
    /**
     * Timestamp of when the playOnce was executed to see if we need to start over the audio
     */
    playedAtTimestamp: number;
    constructor(audioClip: AudioClip);
    /**
     * Disables the looping and plays the current source once.
     * If the sound was playing, it stops and starts over.
     */
    playOnce(): this;
}

/**
 * @public
 */
declare class AudioStream extends ObservableComponent {
    readonly url: string;
    playing: boolean;
    volume: number;
    constructor(url: string);
}

/**
 * @public
 */
declare type AvatarForRenderer = {
    bodyShape: WearableId;
    skinColor: ReadOnlyColor4;
    hairColor: ReadOnlyColor4;
    eyeColor: ReadOnlyColor4;
    wearables: WearableId[];
};

/**
 * Define an area where avatars can be modified in some way
 * @public
 */
declare class AvatarModifierArea extends ObservableComponent {
    area: Area;
    modifiers: AvatarModifiers[];
    constructor(args: {
        area: Area;
        modifiers: AvatarModifiers[];
    });
}

/** @public */
declare enum AvatarModifiers {
    HIDE_AVATARS = "HIDE_AVATARS",
    DISABLE_PASSPORTS = "DISABLE_PASSPORTS"
}

/**
 * @public
 */
declare class AvatarShape extends ObservableComponent {
    id: string;
    name: string;
    expressionTriggerId: string;
    expressionTriggerTimestamp: number;
    bodyShape: WearableId;
    wearables: WearableId[];
    skinColor: ReadOnlyColor4;
    hairColor: ReadOnlyColor4;
    eyeColor: ReadOnlyColor4;
    useDummyModel: boolean;
    talking: boolean;
    static Dummy(): AvatarShape;
}

/**
 * Defines the 3 main axes
 * @public
 */
declare class Axis {
    /** X axis */
    static X: Vector3;
    /** Y axis */
    static Y: Vector3;
    /** Z axis */
    static Z: Vector3;
}

/**
 * @public
 */
declare interface BasicAvatarInfo {
    userId: string;
    name: string;
}

/**
 * @public
 */
declare class BasicMaterial extends ObservableComponent {
    /**
     * The source of the texture image.
     */
    texture?: Texture | VideoTexture;
    /**
     * A number between 0 and 1.
     * Any pixel with an alpha lower than this value will be shown as transparent.
     */
    alphaTest: number;
    /**
     * Allow the material to cast shadows over other objects
     */
    castShadows?: boolean;
}

/**
 * Class used to represent a Bezier curve
 * @public
 */
declare class BezierCurve {
    /**
     * Returns the cubic Bezier interpolated value (float) at "t" (float) from the given x1, y1, x2, y2 floats
     * @param t - defines the time
     * @param x1 - defines the left coordinate on X axis
     * @param y1 - defines the left coordinate on Y axis
     * @param x2 - defines the right coordinate on X axis
     * @param y2 - defines the right coordinate on Y axis
     * @returns the interpolated value
     */
    static Interpolate(t: number, x1: number, y1: number, x2: number, y2: number): number;
}

/**
 * Billboard defines a behavior that makes the entity face the camera in any moment.
 * @public
 */
declare class Billboard extends ObservableComponent {
    x: boolean;
    y: boolean;
    z: boolean;
    constructor(x?: boolean, y?: boolean, z?: boolean);
}

/**
 * @public
 */
declare type BodyShapeRespresentation = {
    bodyShapes: string[];
    mainFile: string;
    contents: FileAndHash[];
};

/**
 * @public
 */
declare class BoxShape extends Shape {
    /**
     * Sets the UV coordinates for the box.
     * Used to map specific pieces of a Material's texture into the box's geometry.
     */
    uvs?: number[];
}

/**
 * @public
 */
declare class Camera {
    static get instance(): Camera;
    /** Camera position, relative to the parcel. */
    readonly position: Vector3;
    /** Camera rotation */
    readonly rotation: Quaternion;
    /** Feet position, relative to the parcel.  */
    readonly feetPosition: Vector3;
    /** Camera position, absolute. */
    readonly worldPosition: Vector3;
    /** Player height. */
    get playerHeight(): number;
    /** Get Camera Mode. */
    get cameraMode(): CameraMode;
    constructor();
}

/** @public */
declare enum CameraMode {
    FirstPerson = 0,
    ThirdPerson = 1,
    BuildingToolGodMode = 2
}

/**
 * @public
 */
declare class CircleShape extends Shape {
    segments?: number;
    arc?: number;
}

/**
 * @public
 */
declare enum CLASS_ID {
    TRANSFORM = 1,
    UUID_CALLBACK = 8,
    BOX_SHAPE = 16,
    SPHERE_SHAPE = 17,
    PLANE_SHAPE = 18,
    CONE_SHAPE = 19,
    CYLINDER_SHAPE = 20,
    TEXT_SHAPE = 21,
    NFT_SHAPE = 22,
    UI_WORLD_SPACE_SHAPE = 23,
    UI_SCREEN_SPACE_SHAPE = 24,
    UI_CONTAINER_RECT = 25,
    UI_CONTAINER_STACK = 26,
    UI_TEXT_SHAPE = 27,
    UI_INPUT_TEXT_SHAPE = 28,
    UI_IMAGE_SHAPE = 29,
    UI_SLIDER_SHAPE = 30,
    CIRCLE_SHAPE = 31,
    BILLBOARD = 32,
    ANIMATION = 33,
    FONT = 34,
    UI_FULLSCREEN_SHAPE = 40,
    UI_BUTTON_SHAPE = 41,
    GLTF_SHAPE = 54,
    OBJ_SHAPE = 55,
    AVATAR_SHAPE = 56,
    BASIC_MATERIAL = 64,
    PBR_MATERIAL = 65,
    HIGHLIGHT_ENTITY = 66,
    /** @deprecated Sound has been deprecataed */
    SOUND = 67,
    TEXTURE = 68,
    VIDEO_CLIP = 70,
    VIDEO_TEXTURE = 71,
    AUDIO_CLIP = 200,
    AUDIO_SOURCE = 201,
    AUDIO_STREAM = 202,
    GIZMOS = 203,
    SMART_ITEM = 204,
    AVATAR_MODIFIER_AREA = 205,
    NAME = 300,
    LOCKED_ON_EDIT = 301,
    VISIBLE_ON_EDIT = 302
}

/**
 * Class used to hold a RBG color
 * @public
 */
declare class Color3 {
    /**
     * Defines the red component (between 0 and 1, default is 0)
     */
    r: number;
    /**
     * Defines the green component (between 0 and 1, default is 0)
     */
    g: number;
    /**
     * Defines the blue component (between 0 and 1, default is 0)
     */
    b: number;
    /**
     * Creates a new Color3 object from red, green, blue values, all between 0 and 1
     * @param r - defines the red component (between 0 and 1, default is 0)
     * @param g - defines the green component (between 0 and 1, default is 0)
     * @param b - defines the blue component (between 0 and 1, default is 0)
     */
    constructor(
    /**
     * Defines the red component (between 0 and 1, default is 0)
     */
    r?: number,
    /**
     * Defines the green component (between 0 and 1, default is 0)
     */
    g?: number,
    /**
     * Defines the blue component (between 0 and 1, default is 0)
     */
    b?: number);
    /**
     * Creates a new Color3 from the string containing valid hexadecimal values
     * @param hex - defines a string containing valid hexadecimal values
     * @returns a new Color3 object
     */
    static FromHexString(hex: string): Color3;
    /**
     * Creates a new Vector3 from the starting index of the given array
     * @param array - defines the source array
     * @param offset - defines an offset in the source array
     * @returns a new Color3 object
     */
    static FromArray(array: ArrayLike<number>, offset?: number): Color3;
    /**
     * Creates a new Color3 from integer values (less than 256)
     * @param r - defines the red component to read from (value between 0 and 255)
     * @param g - defines the green component to read from (value between 0 and 255)
     * @param b - defines the blue component to read from (value between 0 and 255)
     * @returns a new Color3 object
     */
    static FromInts(r: number, g: number, b: number): Color3;
    /**
     * Creates a new Color3 with values linearly interpolated of "amount" between the start Color3 and the end Color3
     * @param start - defines the start Color3 value
     * @param end - defines the end Color3 value
     * @param amount - defines the gradient value between start and end
     * @returns a new Color3 object
     */
    static Lerp(start: Color3, end: Color3, amount: number): Color3;
    /**
     * Creates a new Color3 with values linearly interpolated of "amount" between the start Color3 and the end Color3
     * @param left - defines the start value
     * @param right - defines the end value
     * @param amount - defines the gradient factor
     * @param result - defines the Color3 object where to store the result
     */
    static LerpToRef(left: Color3, right: Color3, amount: number, result: Color3): void;
    /**
     * Returns a Color3 value containing a red color
     * @returns a new Color3 object
     */
    static Red(): Color3;
    /**
     * Returns a Color3 value containing a green color
     * @returns a new Color3 object
     */
    static Green(): Color3;
    /**
     * Returns a Color3 value containing a blue color
     * @returns a new Color3 object
     */
    static Blue(): Color3;
    /**
     * Returns a Color3 value containing a black color
     * @returns a new Color3 object
     */
    static Black(): Color3;
    /**
     * Returns a Color3 value containing a white color
     * @returns a new Color3 object
     */
    static White(): Color3;
    /**
     * Returns a Color3 value containing a purple color
     * @returns a new Color3 object
     */
    static Purple(): Color3;
    /**
     * Returns a Color3 value containing a magenta color
     * @returns a new Color3 object
     */
    static Magenta(): Color3;
    /**
     * Returns a Color3 value containing a yellow color
     * @returns a new Color3 object
     */
    static Yellow(): Color3;
    /**
     * Returns a Color3 value containing a gray color
     * @returns a new Color3 object
     */
    static Gray(): Color3;
    /**
     * Returns a Color3 value containing a teal color
     * @returns a new Color3 object
     */
    static Teal(): Color3;
    /**
     * Returns a Color3 value containing a random color
     * @returns a new Color3 object
     */
    static Random(): Color3;
    /**
     * Creates a string with the Color3 current values
     * @returns the string representation of the Color3 object
     */
    toString(): string;
    /**
     * Returns the string "Color3"
     * @returns "Color3"
     */
    getClassName(): string;
    /**
     * Compute the Color3 hash code
     * @returns an unique number that can be used to hash Color3 objects
     */
    getHashCode(): number;
    /**
     * Stores in the given array from the given starting index the red, green, blue values as successive elements
     * @param array - defines the array where to store the r,g,b components
     * @param index - defines an optional index in the target array to define where to start storing values
     * @returns the current Color3 object
     */
    toArray(array: FloatArray, index?: number): Color3;
    /**
     * Returns a new Color4 object from the current Color3 and the given alpha
     * @param alpha - defines the alpha component on the new Color4 object (default is 1)
     * @returns a new Color4 object
     */
    toColor4(alpha?: number): Color4;
    /**
     * Returns a new array populated with 3 numeric elements : red, green and blue values
     * @returns the new array
     */
    asArray(): number[];
    /**
     * Returns the luminance value
     * @returns a float value
     */
    toLuminance(): number;
    /**
     * Multiply each Color3 rgb values by the given Color3 rgb values in a new Color3 object
     * @param otherColor - defines the second operand
     * @returns the new Color3 object
     */
    multiply(otherColor: Color3): Color3;
    /**
     * Multiply the rgb values of the Color3 and the given Color3 and stores the result in the object "result"
     * @param otherColor - defines the second operand
     * @param result - defines the Color3 object where to store the result
     * @returns the current Color3
     */
    multiplyToRef(otherColor: Color3, result: Color3): Color3;
    /**
     * Determines equality between Color3 objects
     * @param otherColor - defines the second operand
     * @returns true if the rgb values are equal to the given ones
     */
    equals(otherColor: Color3): boolean;
    /**
     * Determines equality between the current Color3 object and a set of r,b,g values
     * @param r - defines the red component to check
     * @param g - defines the green component to check
     * @param b - defines the blue component to check
     * @returns true if the rgb values are equal to the given ones
     */
    equalsFloats(r: number, g: number, b: number): boolean;
    /**
     * Multiplies in place each rgb value by scale
     * @param scale - defines the scaling factor
     * @returns the updated Color3
     */
    scale(scale: number): Color3;
    /**
     * Multiplies the rgb values by scale and stores the result into "result"
     * @param scale - defines the scaling factor
     * @param result - defines the Color3 object where to store the result
     * @returns the unmodified current Color3
     */
    scaleToRef(scale: number, result: Color3): Color3;
    /**
     * Scale the current Color3 values by a factor and add the result to a given Color3
     * @param scale - defines the scale factor
     * @param result - defines color to store the result into
     * @returns the unmodified current Color3
     */
    scaleAndAddToRef(scale: number, result: Color3): Color3;
    /**
     * Clamps the rgb values by the min and max values and stores the result into "result"
     * @param min - defines minimum clamping value (default is 0)
     * @param max - defines maximum clamping value (default is 1)
     * @param result - defines color to store the result into
     * @returns the original Color3
     */
    clampToRef(min: number | undefined, max: number | undefined, result: Color3): Color3;
    /**
     * Creates a new Color3 set with the added values of the current Color3 and of the given one
     * @param otherColor - defines the second operand
     * @returns the new Color3
     */
    add(otherColor: Color3): Color3;
    /**
     * Stores the result of the addition of the current Color3 and given one rgb values into "result"
     * @param otherColor - defines the second operand
     * @param result - defines Color3 object to store the result into
     * @returns the unmodified current Color3
     */
    addToRef(otherColor: Color3, result: Color3): Color3;
    /**
     * Returns a new Color3 set with the subtracted values of the given one from the current Color3
     * @param otherColor - defines the second operand
     * @returns the new Color3
     */
    subtract(otherColor: Color3): Color3;
    /**
     * Stores the result of the subtraction of given one from the current Color3 rgb values into "result"
     * @param otherColor - defines the second operand
     * @param result - defines Color3 object to store the result into
     * @returns the unmodified current Color3
     */
    subtractToRef(otherColor: Color3, result: Color3): Color3;
    /**
     * Copy the current object
     * @returns a new Color3 copied the current one
     */
    clone(): Color3;
    /**
     * Copies the rgb values from the source in the current Color3
     * @param source - defines the source Color3 object
     * @returns the updated Color3 object
     */
    copyFrom(source: Color3): Color3;
    /**
     * Updates the Color3 rgb values from the given floats
     * @param r - defines the red component to read from
     * @param g - defines the green component to read from
     * @param b - defines the blue component to read from
     * @returns the current Color3 object
     */
    copyFromFloats(r: number, g: number, b: number): Color3;
    /**
     * Updates the Color3 rgb values from the given floats
     * @param r - defines the red component to read from
     * @param g - defines the green component to read from
     * @param b - defines the blue component to read from
     * @returns the current Color3 object
     */
    set(r: number, g: number, b: number): Color3;
    /**
     * Compute the Color3 hexadecimal code as a string
     * @returns a string containing the hexadecimal representation of the Color3 object
     */
    toHexString(): string;
    /**
     * Computes a new Color3 converted from the current one to linear space
     * @returns a new Color3 object
     */
    toLinearSpace(): Color3;
    /**
     * Converts the Color3 values to linear space and stores the result in "convertedColor"
     * @param convertedColor - defines the Color3 object where to store the linear space version
     * @returns the unmodified Color3
     */
    toLinearSpaceToRef(convertedColor: Color3): Color3;
    /**
     * Computes a new Color3 converted from the current one to gamma space
     * @returns a new Color3 object
     */
    toGammaSpace(): Color3;
    /**
     * Converts the Color3 values to gamma space and stores the result in "convertedColor"
     * @param convertedColor - defines the Color3 object where to store the gamma space version
     * @returns the unmodified Color3
     */
    toGammaSpaceToRef(convertedColor: Color3): Color3;
    /**
     * Serializes Color3
     */
    toJSON(): {
        r: number;
        g: number;
        b: number;
    };
}

/**
 * Class used to hold a RBGA color
 * @public
 */
declare class Color4 {
    /**
     * Defines the red component (between 0 and 1, default is 0)
     */
    r: number;
    /**
     * Defines the green component (between 0 and 1, default is 0)
     */
    g: number;
    /**
     * Defines the blue component (between 0 and 1, default is 0)
     */
    b: number;
    /**
     * Defines the alpha component (between 0 and 1, default is 1)
     */
    a: number;
    /**
     * Creates a new Color4 object from red, green, blue values, all between 0 and 1
     * @param r - defines the red component (between 0 and 1, default is 0)
     * @param g - defines the green component (between 0 and 1, default is 0)
     * @param b - defines the blue component (between 0 and 1, default is 0)
     * @param a - defines the alpha component (between 0 and 1, default is 1)
     */
    constructor(
    /**
     * Defines the red component (between 0 and 1, default is 0)
     */
    r?: number,
    /**
     * Defines the green component (between 0 and 1, default is 0)
     */
    g?: number,
    /**
     * Defines the blue component (between 0 and 1, default is 0)
     */
    b?: number,
    /**
     * Defines the alpha component (between 0 and 1, default is 1)
     */
    a?: number);
    /**
     * Creates a new Color4 from the string containing valid hexadecimal values
     * @param hex - defines a string containing valid hexadecimal values
     * @returns a new Color4 object
     */
    static FromHexString(hex: string): Color4;
    /**
     * Creates a new Color4 object set with the linearly interpolated values of "amount" between the left Color4 object and the right Color4 object
     * @param left - defines the start value
     * @param right - defines the end value
     * @param amount - defines the gradient factor
     * @returns a new Color4 object
     */
    static Lerp(left: Color4, right: Color4, amount: number): Color4;
    /**
     * Set the given "result" with the linearly interpolated values of "amount" between the left Color4 object and the right Color4 object
     * @param left - defines the start value
     * @param right - defines the end value
     * @param amount - defines the gradient factor
     * @param result - defines the Color4 object where to store data
     */
    static LerpToRef(left: Color4, right: Color4, amount: number, result: Color4): void;
    /**
     * Returns a Color4 value containing a red color
     * @returns a new Color3 object
     */
    static Red(): Color4;
    /**
     * Returns a Color4 value containing a green color
     * @returns a new Color4 object
     */
    static Green(): Color4;
    /**
     * Returns a Color4 value containing a blue color
     * @returns a new Color4 object
     */
    static Blue(): Color4;
    /**
     * Returns a Color4 value containing a black color
     * @returns a new Color4 object
     */
    static Black(): Color4;
    /**
     * Returns a Color4 value containing a white color
     * @returns a new Color4 object
     */
    static White(): Color4;
    /**
     * Returns a Color4 value containing a purple color
     * @returns a new Color4 object
     */
    static Purple(): Color4;
    /**
     * Returns a Color4 value containing a magenta color
     * @returns a new Color4 object
     */
    static Magenta(): Color4;
    /**
     * Returns a Color4 value containing a yellow color
     * @returns a new Color4 object
     */
    static Yellow(): Color4;
    /**
     * Returns a Color4 value containing a gray color
     * @returns a new Color4 object
     */
    static Gray(): Color4;
    /**
     * Returns a Color4 value containing a teal color
     * @returns a new Color4 object
     */
    static Teal(): Color4;
    /**
     * Returns a Color4 value containing a transparent color
     * @returns a new Color4 object
     */
    static Clear(): Color4;
    /**
     * Creates a new Color4 from a Color3 and an alpha value
     * @param color3 - defines the source Color3 to read from
     * @param alpha - defines the alpha component (1.0 by default)
     * @returns a new Color4 object
     */
    static FromColor3(color3: Color3, alpha?: number): Color4;
    /**
     * Creates a new Color4 from the starting index element of the given array
     * @param array - defines the source array to read from
     * @param offset - defines the offset in the source array
     * @returns a new Color4 object
     */
    static FromArray(array: ArrayLike<number>, offset?: number): Color4;
    /**
     * Creates a new Color3 from integer values (less than 256)
     * @param r - defines the red component to read from (value between 0 and 255)
     * @param g - defines the green component to read from (value between 0 and 255)
     * @param b - defines the blue component to read from (value between 0 and 255)
     * @param a - defines the alpha component to read from (value between 0 and 255)
     * @returns a new Color3 object
     */
    static FromInts(r: number, g: number, b: number, a: number): Color4;
    /**
     * Check the content of a given array and convert it to an array containing RGBA data
     * If the original array was already containing count * 4 values then it is returned directly
     * @param colors - defines the array to check
     * @param count - defines the number of RGBA data to expect
     * @returns an array containing count * 4 values (RGBA)
     */
    static CheckColors4(colors: number[], count: number): number[];
    /**
     * Adds in place the given Color4 values to the current Color4 object
     * @param right - defines the second operand
     * @returns the current updated Color4 object
     */
    addInPlace(right: Color4): Color4;
    /**
     * Creates a new array populated with 4 numeric elements : red, green, blue, alpha values
     * @returns the new array
     */
    asArray(): number[];
    /**
     * Stores from the starting index in the given array the Color4 successive values
     * @param array - defines the array where to store the r,g,b components
     * @param index - defines an optional index in the target array to define where to start storing values
     * @returns the current Color4 object
     */
    toArray(array: number[], index?: number): Color4;
    /**
     * Creates a new Color4 set with the added values of the current Color4 and of the given one
     * @param right - defines the second operand
     * @returns a new Color4 object
     */
    add(right: Color4): Color4;
    /**
     * Creates a new Color4 set with the subtracted values of the given one from the current Color4
     * @param right - defines the second operand
     * @returns a new Color4 object
     */
    subtract(right: Color4): Color4;
    /**
     * Subtracts the given ones from the current Color4 values and stores the results in "result"
     * @param right - defines the second operand
     * @param result - defines the Color4 object where to store the result
     * @returns the current Color4 object
     */
    subtractToRef(right: Color4, result: Color4): Color4;
    /**
     * Creates a new Color4 with the current Color4 values multiplied by scale
     * @param scale - defines the scaling factor to apply
     * @returns a new Color4 object
     */
    scale(scale: number): Color4;
    /**
     * Multiplies the current Color4 values by scale and stores the result in "result"
     * @param scale - defines the scaling factor to apply
     * @param result - defines the Color4 object where to store the result
     * @returns the current unmodified Color4
     */
    scaleToRef(scale: number, result: Color4): Color4;
    /**
     * Scale the current Color4 values by a factor and add the result to a given Color4
     * @param scale - defines the scale factor
     * @param result - defines the Color4 object where to store the result
     * @returns the unmodified current Color4
     */
    scaleAndAddToRef(scale: number, result: Color4): Color4;
    /**
     * Clamps the rgb values by the min and max values and stores the result into "result"
     * @param min - defines minimum clamping value (default is 0)
     * @param max - defines maximum clamping value (default is 1)
     * @param result - defines color to store the result into.
     * @returns the cuurent Color4
     */
    clampToRef(min: number | undefined, max: number | undefined, result: Color4): Color4;
    /**
     * Multipy an Color4 value by another and return a new Color4 object
     * @param color - defines the Color4 value to multiply by
     * @returns a new Color4 object
     */
    multiply(color: Color4): Color4;
    /**
     * Multipy a Color4 value by another and push the result in a reference value
     * @param color - defines the Color4 value to multiply by
     * @param result - defines the Color4 to fill the result in
     * @returns the result Color4
     */
    multiplyToRef(color: Color4, result: Color4): Color4;
    /**
     * Creates a string with the Color4 current values
     * @returns the string representation of the Color4 object
     */
    toString(): string;
    /**
     * Returns the string "Color4"
     * @returns "Color4"
     */
    getClassName(): string;
    /**
     * Compute the Color4 hash code
     * @returns an unique number that can be used to hash Color4 objects
     */
    getHashCode(): number;
    /**
     * Creates a new Color4 copied from the current one
     * @returns a new Color4 object
     */
    clone(): Color4;
    /**
     * Copies the given Color4 values into the current one
     * @param source - defines the source Color4 object
     * @returns the current updated Color4 object
     */
    copyFrom(source: Color4): Color4;
    /**
     * Copies the given float values into the current one
     * @param r - defines the red component to read from
     * @param g - defines the green component to read from
     * @param b - defines the blue component to read from
     * @param a - defines the alpha component to read from
     * @returns the current updated Color4 object
     */
    copyFromFloats(r: number, g: number, b: number, a: number): Color4;
    /**
     * Copies the given float values into the current one
     * @param r - defines the red component to read from
     * @param g - defines the green component to read from
     * @param b - defines the blue component to read from
     * @param a - defines the alpha component to read from
     * @returns the current updated Color4 object
     */
    set(r: number, g: number, b: number, a: number): Color4;
    /**
     * Compute the Color4 hexadecimal code as a string
     * @returns a string containing the hexadecimal representation of the Color4 object
     */
    toHexString(): string;
    /**
     * Computes a new Color4 converted from the current one to linear space
     * @returns a new Color4 object
     */
    toLinearSpace(): Color4;
    /**
     * Converts the Color4 values to linear space and stores the result in "convertedColor"
     * @param convertedColor - defines the Color4 object where to store the linear space version
     * @returns the unmodified Color4
     */
    toLinearSpaceToRef(convertedColor: Color4): Color4;
    /**
     * Computes a new Color4 converted from the current one to gamma space
     * @returns a new Color4 object
     */
    toGammaSpace(): Color4;
    /**
     * Converts the Color4 values to gamma space and stores the result in "convertedColor"
     * @param convertedColor - defines the Color4 object where to store the gamma space version
     * @returns the unmodified Color4
     */
    toGammaSpaceToRef(convertedColor: Color4): Color4;
}

/**
 * @public
 */
declare function Component(componentName: string, classId?: number): <TFunction extends ComponentConstructor<any>>(target: TFunction) => void | TFunction;

/**
 * @public
 */
declare class ComponentAdded {
    entity: IEntity;
    componentName: string;
    classId: number | null;
    constructor(entity: IEntity, componentName: string, classId: number | null);
}

/**
 * @public
 */
declare interface ComponentConstructor<T extends ComponentLike> {
    isComponent?: boolean;
    originalClassName?: string;
    new (...args: any[]): T;
}

/**
 * @public
 */
declare class ComponentGroup {
    readonly entities: ReadonlyArray<IEntity>;
    readonly requires: ReadonlyArray<ComponentConstructor<any>>;
    readonly requiresNames: ReadonlyArray<string>;
    active: boolean;
    private _requiresNames;
    constructor(...requires: ComponentConstructor<any>[]);
    hasEntity(entity: IEntity): boolean;
}

/**
 * @public
 */
declare interface ComponentLike {
}

/**
 * @public
 */
declare class ComponentRemoved {
    entity: IEntity;
    componentName: string;
    component: ComponentLike;
    constructor(entity: IEntity, componentName: string, component: ComponentLike);
}

/**
 * @public
 */
declare class ConeShape extends Shape {
    /**
     * The radius of the top of a truncated cone. Defaults to 0.
     */
    radiusTop: number;
    /**
     * The radius of the base of the cone. Defaults to 1.
     */
    radiusBottom: number;
    /**
     * Sets the number of rings along the cone height (positive integer). Defaults to 1.
     */
    segmentsHeight: number;
    /**
     * Sets the number of cone sides (positive integer). Defaults to 36.
     */
    segmentsRadial: number;
    /**
     * Adds two extra faces per subdivision to enclose the cone around its height axis.
     * Defaults to false.
     */
    openEnded: boolean;
    /**
     * Sets the radius of the top and bottom caps at once.
     *
     * Properties `radiusTop` and `radiusBottom` are prioritized over this one.
     */
    radius: number | null;
    /**
     * Sets the ratio (max 1) to apply to the circumference to slice the cone. Defaults to 360.
     */
    arc: number;
}

/**
 * A Curve3 object is a logical object, so not a mesh, to handle curves in the 3D geometric space.
 * A Curve3 is designed from a series of successive Vector3.
 * {@link https://doc.babylonjs.com/how_to/how_to_use_curve3 }
 * @public
 */
declare class Curve3 {
    private _points;
    private _length;
    /**
     * A Curve3 object is a logical object, so not a mesh, to handle curves in the 3D geometric space.
     * A Curve3 is designed from a series of successive Vector3.
     * {@link http://doc.babylonjs.com/tutorials/How_to_use_Curve3#curve3-object | Tutorial }
     * @param points - points which make up the curve
     */
    constructor(points: Vector3[]);
    /**
     * Returns a Curve3 object along a Quadratic Bezier curve : http://doc.babylonjs.com/tutorials/How_to_use_Curve3#quadratic-bezier-curve
     * @param v0 - (Vector3) the origin point of the Quadratic Bezier
     * @param v1 - (Vector3) the control point
     * @param v2 - (Vector3) the end point of the Quadratic Bezier
     * @param nbPoints - (integer) the wanted number of points in the curve
     * @returns the created Curve3
     */
    static CreateQuadraticBezier(v0: Vector3, v1: Vector3, v2: Vector3, nbPoints: number): Curve3;
    /**
     * Returns a Curve3 object along a Cubic Bezier curve : http://doc.babylonjs.com/tutorials/How_to_use_Curve3#cubic-bezier-curve
     * @param v0 - (Vector3) the origin point of the Cubic Bezier
     * @param v1 - (Vector3) the first control point
     * @param v2 - (Vector3) the second control point
     * @param v3 - (Vector3) the end point of the Cubic Bezier
     * @param nbPoints - (integer) the wanted number of points in the curve
     * @returns the created Curve3
     */
    static CreateCubicBezier(v0: Vector3, v1: Vector3, v2: Vector3, v3: Vector3, nbPoints: number): Curve3;
    /**
     * Returns a Curve3 object along a Hermite Spline curve : http://doc.babylonjs.com/tutorials/How_to_use_Curve3#hermite-spline
     * @param p1 - (Vector3) the origin point of the Hermite Spline
     * @param t1 - (Vector3) the tangent vector at the origin point
     * @param p2 - (Vector3) the end point of the Hermite Spline
     * @param t2 - (Vector3) the tangent vector at the end point
     * @param nbPoints - (integer) the wanted number of points in the curve
     * @returns the created Curve3
     */
    static CreateHermiteSpline(p1: Vector3, t1: Vector3, p2: Vector3, t2: Vector3, nbPoints: number): Curve3;
    /**
     * Returns a Curve3 object along a CatmullRom Spline curve :
     * @param points - (array of Vector3) the points the spline must pass through. At least, four points required
     * @param nbPoints - (integer) the wanted number of points between each curve control points
     * @param closed - (boolean) optional with default false, when true forms a closed loop from the points
     * @returns the created Curve3
     */
    static CreateCatmullRomSpline(points: Vector3[], nbPoints: number, closed?: boolean): Curve3;
    /**
     * @returns the Curve3 stored array of successive Vector3
     */
    getPoints(): Vector3[];
    /**
     * @returns the computed length (float) of the curve.
     */
    length(): number;
    /**
     * Returns a new instance of Curve3 object : var curve = curveA.continue(curveB);
     * This new Curve3 is built by translating and sticking the curveB at the end of the curveA.
     * curveA and curveB keep unchanged.
     * @param curve - the curve to continue from this curve
     * @returns the newly constructed curve
     */
    continue(curve: Curve3): Curve3;
    private _computeLength;
}

/**
 * @public
 */
declare class CylinderShape extends Shape {
    /**
     * The radius of the top of the cylinder. Defaults to 0.
     */
    radiusTop: number;
    /**
     * The radius of the base of the cylinder. Defaults to 1.
     */
    radiusBottom: number;
    /**
     * Sets the number of rings along the cylinder height (positive integer). Defaults to 1.
     */
    segmentsHeight: number;
    /**
     * Sets the number of cylinder sides (positive integer). Defaults to 36.
     */
    segmentsRadial: number;
    /**
     * Adds two extra faces per subdivision to enclose the cylinder around its height axis.
     * Defaults to false.
     */
    openEnded: boolean;
    /**
     * Sets the radius of the top and bottom caps at once.
     *
     * Properties `radiusTop` and `radiusBottom` are prioritized over this one.
     */
    radius: number | null;
    /**
     * Sets the ratio (max 1) to apply to the circumference to slice the cylinder. Defaults to 360.
     */
    arc: number;
}

/**
 * Constant used to convert from Euler degrees to radians
 * @public
 */
declare const DEG2RAD: number;

/**
 * @public
 */
declare function DisposableComponent(componentName: string, classId: number): <TFunction extends DisposableComponentConstructor<any>>(target: TFunction) => void | TFunction;

/**
 * @public
 */
declare interface DisposableComponentConstructor<T extends DisposableComponentLike> {
    isComponent?: boolean;
    isDisposableComponent?: true;
    originalClassName?: string;
    new (...args: any[]): T;
}

/**
 * @public
 */
declare class DisposableComponentCreated {
    componentId: string;
    componentName: string;
    classId: number;
    constructor(componentId: string, componentName: string, classId: number);
}

/**
 * @public
 */
declare interface DisposableComponentLike extends ComponentLike {
    onDispose?(): void;
}

/**
 * @public
 */
declare class DisposableComponentRemoved {
    componentId: string;
    constructor(componentId: string);
}

/**
 * @public
 */
declare class DisposableComponentUpdated {
    componentId: string;
    component: DisposableComponentLike;
    constructor(componentId: string, component: DisposableComponentLike);
}

/** @public */
declare type double = number;

/**
 * @public
 */
declare type EcsMathReadOnlyQuaternion = {
    readonly x: number;
    readonly y: number;
    readonly z: number;
    readonly w: number;
};

/**
 * @public
 */
declare type EcsMathReadOnlyVector2 = {
    readonly y: number;
    readonly x: number;
};

/**
 * @public
 */
declare type EcsMathReadOnlyVector3 = {
    readonly y: number;
    readonly x: number;
    readonly z: number;
};

/**
 * @public
 */
declare type EcsMathReadOnlyVector4 = {
    readonly x: number;
    readonly y: number;
    readonly z: number;
    readonly w: number;
};

/**
 * @public
 */
declare class Engine implements IEngine {
    readonly eventManager: EventManager;
    readonly rootEntity: IEntity;
    readonly firstPersonCameraEntity: IEntity;
    readonly avatarEntity: IEntity;
    private readonly _entities;
    private readonly _disposableComponents;
    private readonly _componentGroups;
    private readonly simpleSystems;
    get entities(): Readonly<Record<string, IEntity>>;
    get disposableComponents(): Readonly<Record<string, DisposableComponentLike>>;
    constructor(rootEntity: IEntity);
    addEntity(entity: IEntity): IEntity;
    removeEntity(entity: IEntity): boolean;
    addSystem(system: ISystem, priority?: number): ISystem;
    removeSystem(system: ISystem): boolean;
    update(dt: number): this;
    getEntitiesWithComponent(component: string): Record<string, any>;
    getEntitiesWithComponent(component: ComponentConstructor<any>): Record<string, IEntity>;
    registerComponent(component: DisposableComponentLike): void;
    disposeComponent(component: DisposableComponentLike): boolean;
    updateComponent(component: DisposableComponentLike): void;
    getComponentGroup(...requires: ComponentConstructor<any>[]): ComponentGroup;
    removeComponentGroup(componentGroup: ComponentGroup): boolean;
    private registerSystem;
    private checkRequirementsAndAdd;
    private checkRequirements;
    private componentAddedHandler;
    private componentRemovedHandler;
}

/** @public */
declare const engine: Engine;

/**
 * @public
 */
declare class Entity implements IEntity {
    name?: string | undefined;
    children: Record<string, IEntity>;
    eventManager: EventManager | null;
    alive: boolean;
    readonly uuid: string;
    readonly components: Record<string, any>;
    constructor(name?: string | undefined);
    /**
     * Adds or replaces a component in the entity.
     * @param component - component instance.
     */
    addComponentOrReplace<T extends object>(component: T): T;
    /**
     * Returns a boolean indicating if a component is present in the entity.
     * @param component - component class, instance or name
     */
    hasComponent<T = any>(component: string): boolean;
    hasComponent<T>(component: ComponentConstructor<T>): boolean;
    hasComponent<T extends object>(component: T): boolean;
    /**
     * Gets a component, if it doesn't exist, it throws an Error.
     * @param component - component class or name
     */
    getComponent<T = any>(component: string): T;
    getComponent<T>(component: ComponentConstructor<T>): T;
    /**
     * Gets a component, if it doesn't exist, it returns null.
     * @param component - component class or name
     */
    getComponentOrNull<T = any>(component: string): T | null;
    getComponentOrNull<T>(component: ComponentConstructor<T>): T | null;
    /**
     * Gets a component, if it doesn't exist, it creates the component and returns it.
     * @param component - component class
     */
    getComponentOrCreate<T>(component: ComponentConstructor<T> & {
        new (): T;
    }): T;
    /**
     * Adds a component. If the component already exist, it throws an Error.
     * @param component - component instance.
     */
    addComponent<T extends object>(component: T): T;
    /**
     * Removes a component instance from the entity.
     * @param component - component instance to remove
     * @param triggerRemovedEvent - should this action trigger an event?
     */
    removeComponent(component: string, triggerRemovedEvent?: boolean): void;
    removeComponent<T extends object>(component: T, triggerRemovedEvent?: boolean): void;
    removeComponent(component: ComponentConstructor<any>, triggerRemovedEvent?: boolean): void;
    /**
     * Returns true if the entity is already added to the engine.
     * Returns false if no engine was defined.
     */
    isAddedToEngine(): boolean;
    /**
     * Sets the parent entity
     */
    setParent(_parent: IEntity | Attachable | null): IEntity;
    /**
     * Gets the parent entity
     */
    getParent(): IEntity | null;
    private get identifier();
    private getCircularAncestor;
    private registerAsChild;
}

/**
 * Constant used to define the minimal number value in Babylon.js
 * @public
 */
declare const Epsilon = 0.000001;

/**
 * Error function. Prints a console error. Only works in debug mode, otherwise it does nothing.
 * @param error - string or Error object.
 * @param data - any debug information.
 * @public
 */
declare function error(error: string | Error, data?: any): void;

/**
 * @public
 */
declare function EventConstructor(): ClassDecorator;

/**
 * @public
 */
declare class EventManager {
    private listeners;
    addListener<T, X>(eventClass: IEventConstructor<T>, listener: X, listenerFunction: (this: X, event: T) => void): this;
    removeListener<X>(listener: X, eventClass: IEventConstructor<any>): boolean;
    fireEvent<T extends object>(event: T): this;
}

/**
 * Executes an asynchronous task
 * @param task - the task to execute
 * @public
 */
declare function executeTask<T>(task: () => Promise<T>): TaskResult<T>;

/**
 * @public
 */
declare type FileAndHash = {
    file: string;
    hash: string;
};

/** @public */
declare type float = number;

/** @public */
declare type FloatArray = number[];

/**
 * @public
 */
declare class Font extends ObservableComponent {
    readonly src: string;
    constructor(src?: string);
}

/**
 * @public
 */
declare enum Fonts {
    /** @deprecated SanFrancisco has been deprecated. Use SansSerif instead.*/
    SanFrancisco = "builtin:SF-UI-Text-Regular SDF",
    /** @deprecated SanFrancisco_Heavy has been deprecated. Use SansSerif_Heavy instead.*/
    SanFrancisco_Heavy = "builtin:SF-UI-Text-Heavy SDF",
    /** @deprecated SanFrancisco_Semibold has been deprecated. Use SansSerif_SemiBold instead.*/
    SanFrancisco_Semibold = "builtin:SF-UI-Text-Semibold SDF",
    LiberationSans = "builtin:LiberationSans SDF",
    SansSerif = "SansSerif",
    SansSerif_Heavy = "SansSerif_Heavy",
    SansSerif_Bold = "SansSerif_Bold",
    SansSerif_SemiBold = "SansSerif_SemiBold"
}

/**
 * Reprasents a camera frustum
 * @public
 */
declare class Frustum {
    /**
     * Gets the planes representing the frustum
     * @param transform - matrix to be applied to the returned planes
     * @returns a new array of 6 Frustum planes computed by the given transformation matrix.
     */
    static GetPlanes(transform: Matrix): Plane[];
    /**
     * Gets the near frustum plane transformed by the transform matrix
     * @param transform - transformation matrix to be applied to the resulting frustum plane
     * @param frustumPlane - the resuling frustum plane
     */
    static GetNearPlaneToRef(transform: Matrix, frustumPlane: Plane): void;
    /**
     * Gets the far frustum plane transformed by the transform matrix
     * @param transform - transformation matrix to be applied to the resulting frustum plane
     * @param frustumPlane - the resuling frustum plane
     */
    static GetFarPlaneToRef(transform: Matrix, frustumPlane: Plane): void;
    /**
     * Gets the left frustum plane transformed by the transform matrix
     * @param transform - transformation matrix to be applied to the resulting frustum plane
     * @param frustumPlane - the resuling frustum plane
     */
    static GetLeftPlaneToRef(transform: Matrix, frustumPlane: Plane): void;
    /**
     * Gets the right frustum plane transformed by the transform matrix
     * @param transform - transformation matrix to be applied to the resulting frustum plane
     * @param frustumPlane - the resuling frustum plane
     */
    static GetRightPlaneToRef(transform: Matrix, frustumPlane: Plane): void;
    /**
     * Gets the top frustum plane transformed by the transform matrix
     * @param transform - transformation matrix to be applied to the resulting frustum plane
     * @param frustumPlane - the resuling frustum plane
     */
    static GetTopPlaneToRef(transform: Matrix, frustumPlane: Plane): void;
    /**
     * Gets the bottom frustum plane transformed by the transform matrix
     * @param transform - transformation matrix to be applied to the resulting frustum plane
     * @param frustumPlane - the resuling frustum plane
     */
    static GetBottomPlaneToRef(transform: Matrix, frustumPlane: Plane): void;
    /**
     * Sets the given array "frustumPlanes" with the 6 Frustum planes computed by the given transformation matrix.
     * @param transform - transformation matrix to be applied to the resulting frustum planes
     * @param frustumPlanes - the resuling frustum planes
     */
    static GetPlanesToRef(transform: Matrix, frustumPlanes: Plane[]): void;
}

/**
 * @public
 */
declare function getComponentClassId<T extends Record<any, any> = any>(component: T | ComponentConstructor<T>): number | null;

/**
 * @public
 */
declare function getComponentId<T extends DisposableComponentLike>(component: T): string;

/**
 * @public
 */
declare function getComponentName<T extends Record<any, any> = any>(component: T | ComponentConstructor<T>): string;

/**
 * Gizmo identifiers
 * @public
 */
declare enum Gizmo {
    MOVE = "MOVE",
    ROTATE = "ROTATE",
    SCALE = "SCALE",
    NONE = "NONE"
}

/**
 * Enables gizmos in the entity. Gizmos only work in EDITOR, PREVIEW or DEBUG modes.
 * @public
 */
declare class Gizmos extends ObservableComponent {
    /**
     * Enable position gizmo
     */
    position: boolean;
    /**
     * Enable rotation gizmo
     */
    rotation: boolean;
    /**
     * Enable scale gizmo
     */
    scale: boolean;
    /**
     * Cycle through gizmos using click.
     */
    cycle: boolean;
    /**
     * If cycle is false, this will be the selected gizmo
     */
    selectedGizmo?: Gizmo;
    /**
     * Align the gizmos to match the local reference system
     */
    localReference: boolean;
}

/**
 * @public
 */
declare class GlobalPointerDown extends PointerEventComponent {
}

/**
 * @public
 */
declare class GlobalPointerUp extends PointerEventComponent {
}

/**
 * @public
 */
declare class GLTFShape extends Shape {
    readonly src: string;
    constructor(src: string);
}

/**
 * @public
 */
declare interface HitEntityInfo {
    isValid: boolean;
    entityId: string;
    meshName: string;
}

/**
 * @public
 */
declare interface IEngine {
    rootEntity: IEntity;
    readonly firstPersonCameraEntity: IEntity;
    readonly avatarEntity: IEntity;
    readonly entities: Readonly<Record<string, IEntity>>;
    addEntity(entity: IEntity): void;
    removeEntity(entity: IEntity): void;
    addSystem(system: ISystem, priority: number): void;
    removeSystem(system: ISystem): void;
}

/**
 * @public
 */
declare interface IEntity {
    children: Record<string, IEntity>;
    eventManager: EventManager | null;
    alive: boolean;
    readonly uuid: string;
    readonly components: Record<string, any>;
    isAddedToEngine(): boolean;
    getParent(): IEntity | null;
    setParent(e: IEntity | Attachable | null): void;
    getComponent<T = any>(component: string): T;
    getComponent<T>(component: ComponentConstructor<T>): T;
    getComponent<T>(component: ComponentConstructor<T> | string): T;
    /**
     * Gets a component, if it doesn't exist, it returns null.
     * @param component - component class or name
     */
    getComponentOrNull<T = any>(component: string): T | null;
    getComponentOrNull<T>(component: ComponentConstructor<T>): T | null;
    getComponentOrNull<T>(component: ComponentConstructor<T> | string): T | null;
    getComponentOrCreate<T>(component: ComponentConstructor<T> & {
        new (): T;
    }): T;
    /**
     * Adds a component. If the component already exist, it throws an Error.
     * @param component - component instance.
     */
    addComponent<T extends object>(component: T): void;
    addComponentOrReplace<T extends object>(component: T): void;
    removeComponent(component: string, triggerRemovedEvent?: boolean): void;
    removeComponent<T extends object>(component: T, triggerRemovedEvent?: boolean): void;
    removeComponent(component: ComponentConstructor<any>, triggerRemovedEvent?: boolean): void;
    removeComponent(component: object | string | Function, triggerRemovedEvent: any): void;
    hasComponent<T = any>(component: string): boolean;
    hasComponent<T>(component: ComponentConstructor<T>): boolean;
    hasComponent<T extends object>(component: T): boolean;
    hasComponent<T>(component: ComponentConstructor<T> | string): boolean;
}

/**
 * @public
 */
declare interface IEventConstructor<T> {
    new (...args: any[]): T;
}

/**
 * @public
 */
declare class Input {
    private static _instance;
    static get instance(): Input;
    private internalState;
    private constructor();
    static ensureInstance(): any;
    /**
     * Allows to know if a button is pressed
     *
     * Returns true if the button is pressed
     * @param buttonId - The id of the button.
     */
    isButtonPressed(buttonId: ActionButton): {
        BUTTON_DOWN: boolean;
    };
    /**
     * Subscribes to an input event and triggers the provided callback.
     *
     * Returns a function that can be called to remove the subscription.
     * @param eventName - The name of the event (see InputEventKind).
     * @param buttonId - The id of the button.
     * @param useRaycast - Enables getting raycast information.
     * @param fn - A callback function to be called when the event is triggered.
     */
    subscribe(eventName: InputEventKind, buttonId: ActionButton, useRaycast: boolean, fn: (e: LocalActionButtonEvent) => void): () => void;
    /**
     * Removes an existing input event subscription.
     * @param eventName - The name of the event (see InputEventKind).
     * @param buttonId - The id of the button.
     * @param fn - The callback function used when subscribing to the event.
     */
    unsubscribe(eventName: InputEventKind, buttonId: ActionButton, fn: (e: LocalActionButtonEvent) => void): false | Subscription[];
    handlePointerEvent(data: GlobalInputEventResult): void;
    private getSubscriptionId;
    private getPointerById;
}

/** @public */
declare type InputEventKind = 'BUTTON_DOWN' | 'BUTTON_UP';

/** @public */
declare enum InputEventType {
    DOWN = 0,
    UP = 1
}

/** @public */
declare type InputState = Record<ActionButton, {
    BUTTON_DOWN: boolean;
}>;

/**
 * @public
 */
declare interface IPhysicsCast {
    hitFirst(ray: Ray, hitCallback: (event: RaycastHitEntity) => void, id?: number): void;
    hitAll(ray: Ray, hitCallback: (event: RaycastHitEntities) => void, id?: number): void;
}

/**
 * @public
 */
declare function isDisposableComponent(component: ComponentLike): boolean;

/**
 * Interface for the size containing width and height
 * @public
 */
declare interface ISize {
    /**
     * Width
     */
    width: number;
    /**
     * Heighht
     */
    height: number;
}

/**
 * @public
 */
declare interface ISystem {
    active?: boolean;
    activate?(engine: IEngine): void;
    deactivate?(): void;
    update?(dt: number): void;
    onAddEntity?(entity: IEntity): void;
    onRemoveEntity?(entity: IEntity): void;
}

/** @public */
declare enum LandRole {
    OWNER = "owner",
    OPERATOR = "operator"
}

/** @public */
declare type LocalActionButtonEvent = GlobalInputEventResult & {
    origin: Vector3;
    direction: Vector3;
    button: ActionButton;
    hit?: GlobalInputEventResult['hit'] & {
        hitPoint: Vector3;
        normal: Vector3;
        worldNormal: Vector3;
    };
};

/**
 * Log function. Only works in debug mode, otherwise it does nothing.
 * @param args - any loggable parameter
 * @public
 */
declare function log(...args: any[]): void;

/**
 * @public
 */
declare class Material extends ObservableComponent {
    /**
     * Cutoff level for ALPHATEST mode. Range is between 0 and 1.
     * Defaults to 0.5
     */
    alphaTest?: number;
    /**
     * AKA Diffuse Color in other nomenclature.
     * Defaults to #CCCCCC.
     */
    albedoColor?: Color4 | Color3;
    /**
     * The color emitted from the material.
     * Defaults to black.
     */
    emissiveColor?: Color3;
    /**
     * Specifies the metallic scalar of the metallic/roughness workflow.
     * Can also be used to scale the metalness values of the metallic texture.
     * Defaults to  0.5.
     */
    metallic?: number;
    /**
     * Specifies the roughness scalar of the metallic/roughness workflow.
     * Can also be used to scale the roughness values of the metallic texture.
     * Defaults to  0.5.
     */
    roughness?: number;
    /**
     * AKA Specular Color in other nomenclature.
     * Defaults to white.
     */
    reflectivityColor?: Color3;
    /**
     * Intensity of the direct lights e.g. the four lights available in scene.
     * This impacts both the direct diffuse and specular highlights.
     * Defaults to 1.
     */
    directIntensity?: number;
    /**
     * AKA Glossiness in other nomenclature.
     * Defaults to 1.
     */
    microSurface?: number;
    /**
     * Intensity of the emissive part of the material.
     * This helps controlling the emissive effect without modifying the emissive color.
     * Defaults to 1.
     */
    emissiveIntensity?: number;
    /**
     * This is a special control allowing the reduction of the specular highlights coming from the
     * four lights of the scene. Those highlights may not be needed in full environment lighting.
     * Defaults to 1.
     */
    specularIntensity?: number;
    /**
     * Texture applied as material.
     */
    albedoTexture?: Texture | VideoTexture;
    /**
     * Texture applied as opacity. Default: the same texture used in albedoTexture.
     */
    alphaTexture?: Texture | VideoTexture;
    /**
     * Emissive texture.
     */
    emissiveTexture?: Texture | VideoTexture;
    /**
     * Stores surface normal data used to displace a mesh in a texture.
     */
    bumpTexture?: Texture;
    /**
     * Allow the material to cast shadows over other objects
     */
    castShadows?: boolean;
    /**
     * Sets the transparency mode of the material.
     * Defaults to -1.
     *
     * | Value | Type                                           |
     * | ----- | ---------------------------------------------- |
     * | 0     | OPAQUE  (default)                              |
     * | 1     | ALPHATEST                                      |
     * | 2     | ALPHABLEND                                     |
     * | 3     | ALPHATESTANDBLEND                              |
     * | 4     | AUTO (ALPHABLEND if alpha OPAQUE otherwise     |
     */
    transparencyMode: TransparencyMode;
}

/**
 * Class used to store matrix data (4x4)
 * @public
 */
declare class Matrix {
    /**
     * Gets the internal data of the matrix
     */
    get m(): Readonly<FloatArray>;
    /**
     * Gets an identity matrix that must not be updated
     */
    static get IdentityReadOnly(): Readonly<Matrix>;
    private static _updateFlagSeed;
    private static _identityReadOnly;
    /**
     * Gets the update flag of the matrix which is an unique number for the matrix.
     * It will be incremented every time the matrix data change.
     * You can use it to speed the comparison between two versions of the same matrix.
     */
    updateFlag: number;
    private _isIdentity;
    private _isIdentityDirty;
    private _isIdentity3x2;
    private _isIdentity3x2Dirty;
    private readonly _m;
    /**
     * Creates an empty matrix (filled with zeros)
     */
    constructor();
    /**
     * Creates a matrix from an array
     * @param array - defines the source array
     * @param offset - defines an offset in the source array
     * @returns a new Matrix set from the starting index of the given array
     */
    static FromArray(array: ArrayLike<number>, offset?: number): Matrix;
    /**
     * Copy the content of an array into a given matrix
     * @param array - defines the source array
     * @param offset - defines an offset in the source array
     * @param result - defines the target matrix
     */
    static FromArrayToRef(array: ArrayLike<number>, offset: number, result: Matrix): void;
    /**
     * Stores an array into a matrix after having multiplied each component by a given factor
     * @param array - defines the source array
     * @param offset - defines the offset in the source array
     * @param scale - defines the scaling factor
     * @param result - defines the target matrix
     */
    static FromFloatArrayToRefScaled(array: FloatArray, offset: number, scale: number, result: Matrix): void;
    /**
     * Stores a list of values (16) inside a given matrix
     * @param initialM11 - defines 1st value of 1st row
     * @param initialM12 - defines 2nd value of 1st row
     * @param initialM13 - defines 3rd value of 1st row
     * @param initialM14 - defines 4th value of 1st row
     * @param initialM21 - defines 1st value of 2nd row
     * @param initialM22 - defines 2nd value of 2nd row
     * @param initialM23 - defines 3rd value of 2nd row
     * @param initialM24 - defines 4th value of 2nd row
     * @param initialM31 - defines 1st value of 3rd row
     * @param initialM32 - defines 2nd value of 3rd row
     * @param initialM33 - defines 3rd value of 3rd row
     * @param initialM34 - defines 4th value of 3rd row
     * @param initialM41 - defines 1st value of 4th row
     * @param initialM42 - defines 2nd value of 4th row
     * @param initialM43 - defines 3rd value of 4th row
     * @param initialM44 - defines 4th value of 4th row
     * @param result - defines the target matrix
     */
    static FromValuesToRef(initialM11: number, initialM12: number, initialM13: number, initialM14: number, initialM21: number, initialM22: number, initialM23: number, initialM24: number, initialM31: number, initialM32: number, initialM33: number, initialM34: number, initialM41: number, initialM42: number, initialM43: number, initialM44: number, result: Matrix): void;
    /**
     * Creates new matrix from a list of values (16)
     * @param initialM11 - defines 1st value of 1st row
     * @param initialM12 - defines 2nd value of 1st row
     * @param initialM13 - defines 3rd value of 1st row
     * @param initialM14 - defines 4th value of 1st row
     * @param initialM21 - defines 1st value of 2nd row
     * @param initialM22 - defines 2nd value of 2nd row
     * @param initialM23 - defines 3rd value of 2nd row
     * @param initialM24 - defines 4th value of 2nd row
     * @param initialM31 - defines 1st value of 3rd row
     * @param initialM32 - defines 2nd value of 3rd row
     * @param initialM33 - defines 3rd value of 3rd row
     * @param initialM34 - defines 4th value of 3rd row
     * @param initialM41 - defines 1st value of 4th row
     * @param initialM42 - defines 2nd value of 4th row
     * @param initialM43 - defines 3rd value of 4th row
     * @param initialM44 - defines 4th value of 4th row
     * @returns the new matrix
     */
    static FromValues(initialM11: number, initialM12: number, initialM13: number, initialM14: number, initialM21: number, initialM22: number, initialM23: number, initialM24: number, initialM31: number, initialM32: number, initialM33: number, initialM34: number, initialM41: number, initialM42: number, initialM43: number, initialM44: number): Matrix;
    /**
     * Creates a new matrix composed by merging scale (vector3), rotation (quaternion) and translation (vector3)
     * @param scale - defines the scale vector3
     * @param rotation - defines the rotation quaternion
     * @param translation - defines the translation vector3
     * @returns a new matrix
     */
    static Compose(scale: Vector3, rotation: Quaternion, translation: Vector3): Matrix;
    /**
     * Sets a matrix to a value composed by merging scale (vector3), rotation (quaternion) and translation (vector3)
     * @param scale - defines the scale vector3
     * @param rotation - defines the rotation quaternion
     * @param translation - defines the translation vector3
     * @param result - defines the target matrix
     */
    static ComposeToRef(scale: Vector3, rotation: Quaternion, translation: Vector3, result: Matrix): void;
    /**
     * Creates a new identity matrix
     * @returns a new identity matrix
     */
    static Identity(): Matrix;
    /**
     * Creates a new identity matrix and stores the result in a given matrix
     * @param result - defines the target matrix
     */
    static IdentityToRef(result: Matrix): void;
    /**
     * Creates a new zero matrix
     * @returns a new zero matrix
     */
    static Zero(): Matrix;
    /**
     * Creates a new rotation matrix for "angle" radians around the X axis
     * @param angle - defines the angle (in radians) to use
     * @returns the new matrix
     */
    static RotationX(angle: number): Matrix;
    /**
     * Creates a new matrix as the invert of a given matrix
     * @param source - defines the source matrix
     * @returns the new matrix
     */
    static Invert(source: Matrix): Matrix;
    /**
     * Creates a new rotation matrix for "angle" radians around the X axis and stores it in a given matrix
     * @param angle - defines the angle (in radians) to use
     * @param result - defines the target matrix
     */
    static RotationXToRef(angle: number, result: Matrix): void;
    /**
     * Creates a new rotation matrix for "angle" radians around the Y axis
     * @param angle - defines the angle (in radians) to use
     * @returns the new matrix
     */
    static RotationY(angle: number): Matrix;
    /**
     * Creates a new rotation matrix for "angle" radians around the Y axis and stores it in a given matrix
     * @param angle - defines the angle (in radians) to use
     * @param result - defines the target matrix
     */
    static RotationYToRef(angle: number, result: Matrix): void;
    /**
     * Creates a new rotation matrix for "angle" radians around the Z axis
     * @param angle - defines the angle (in radians) to use
     * @returns the new matrix
     */
    static RotationZ(angle: number): Matrix;
    /**
     * Creates a new rotation matrix for "angle" radians around the Z axis and stores it in a given matrix
     * @param angle - defines the angle (in radians) to use
     * @param result - defines the target matrix
     */
    static RotationZToRef(angle: number, result: Matrix): void;
    /**
     * Creates a new rotation matrix for "angle" radians around the given axis
     * @param axis - defines the axis to use
     * @param angle - defines the angle (in radians) to use
     * @returns the new matrix
     */
    static RotationAxis(axis: Vector3, angle: number): Matrix;
    /**
     * Creates a new rotation matrix for "angle" radians around the given axis and stores it in a given matrix
     * @param axis - defines the axis to use
     * @param angle - defines the angle (in radians) to use
     * @param result - defines the target matrix
     */
    static RotationAxisToRef(axis: Vector3, angle: number, result: Matrix): void;
    /**
     * Creates a rotation matrix
     * @param yaw - defines the yaw angle in radians (Y axis)
     * @param pitch - defines the pitch angle in radians (X axis)
     * @param roll - defines the roll angle in radians (X axis)
     * @returns the new rotation matrix
     */
    static RotationYawPitchRoll(yaw: number, pitch: number, roll: number): Matrix;
    /**
     * Creates a rotation matrix and stores it in a given matrix
     * @param yaw - defines the yaw angle in radians (Y axis)
     * @param pitch - defines the pitch angle in radians (X axis)
     * @param roll - defines the roll angle in radians (X axis)
     * @param result - defines the target matrix
     */
    static RotationYawPitchRollToRef(yaw: number, pitch: number, roll: number, result: Matrix): void;
    /**
     * Creates a scaling matrix
     * @param x - defines the scale factor on X axis
     * @param y - defines the scale factor on Y axis
     * @param z - defines the scale factor on Z axis
     * @returns the new matrix
     */
    static Scaling(x: number, y: number, z: number): Matrix;
    /**
     * Creates a scaling matrix and stores it in a given matrix
     * @param x - defines the scale factor on X axis
     * @param y - defines the scale factor on Y axis
     * @param z - defines the scale factor on Z axis
     * @param result - defines the target matrix
     */
    static ScalingToRef(x: number, y: number, z: number, result: Matrix): void;
    /**
     * Creates a translation matrix
     * @param x - defines the translation on X axis
     * @param y - defines the translation on Y axis
     * @param z - defines the translationon Z axis
     * @returns the new matrix
     */
    static Translation(x: number, y: number, z: number): Matrix;
    /**
     * Creates a translation matrix and stores it in a given matrix
     * @param x - defines the translation on X axis
     * @param y - defines the translation on Y axis
     * @param z - defines the translationon Z axis
     * @param result - defines the target matrix
     */
    static TranslationToRef(x: number, y: number, z: number, result: Matrix): void;
    /**
     * Returns a new Matrix whose values are the interpolated values for "gradient" (float) between the ones of the matrices "startValue" and "endValue".
     * @param startValue - defines the start value
     * @param endValue - defines the end value
     * @param gradient - defines the gradient factor
     * @returns the new matrix
     */
    static Lerp(startValue: Matrix, endValue: Matrix, gradient: number): Matrix;
    /**
     * Set the given matrix "result" as the interpolated values for "gradient" (float) between the ones of the matrices "startValue" and "endValue".
     * @param startValue - defines the start value
     * @param endValue - defines the end value
     * @param gradient - defines the gradient factor
     * @param result - defines the Matrix object where to store data
     */
    static LerpToRef(startValue: Matrix, endValue: Matrix, gradient: number, result: Matrix): void;
    /**
     * Builds a new matrix whose values are computed by:
     * * decomposing the the "startValue" and "endValue" matrices into their respective scale, rotation and translation matrices
     * * interpolating for "gradient" (float) the values between each of these decomposed matrices between the start and the end
     * * recomposing a new matrix from these 3 interpolated scale, rotation and translation matrices
     * @param startValue - defines the first matrix
     * @param endValue - defines the second matrix
     * @param gradient - defines the gradient between the two matrices
     * @returns the new matrix
     */
    static DecomposeLerp(startValue: Matrix, endValue: Matrix, gradient: number): Matrix;
    /**
     * Update a matrix to values which are computed by:
     * * decomposing the the "startValue" and "endValue" matrices into their respective scale, rotation and translation matrices
     * * interpolating for "gradient" (float) the values between each of these decomposed matrices between the start and the end
     * * recomposing a new matrix from these 3 interpolated scale, rotation and translation matrices
     * @param startValue - defines the first matrix
     * @param endValue - defines the second matrix
     * @param gradient - defines the gradient between the two matrices
     * @param result - defines the target matrix
     */
    static DecomposeLerpToRef(startValue: Matrix, endValue: Matrix, gradient: number, result: Matrix): void;
    /**
     * Gets a new rotation matrix used to rotate an entity so as it looks at the target vector3, from the eye vector3 position, the up vector3 being oriented like "up"
     * This function works in left handed mode
     * @param eye - defines the final position of the entity
     * @param target - defines where the entity should look at
     * @param up - defines the up vector for the entity
     * @returns the new matrix
     */
    static LookAtLH(eye: Vector3, target: Vector3, up: Vector3): Matrix;
    /**
     * Sets the given "result" Matrix to a rotation matrix used to rotate an entity so that it looks at the target vector3, from the eye vector3 position, the up vector3 being oriented like "up".
     * This function works in left handed mode
     * @param eye - defines the final position of the entity
     * @param target - defines where the entity should look at
     * @param up - defines the up vector for the entity
     * @param result - defines the target matrix
     */
    static LookAtLHToRef(eye: Vector3, target: Vector3, up: Vector3, result: Matrix): void;
    /**
     * Gets a new rotation matrix used to rotate an entity so as it looks at the target vector3, from the eye vector3 position, the up vector3 being oriented like "up"
     * This function works in right handed mode
     * @param eye - defines the final position of the entity
     * @param target - defines where the entity should look at
     * @param up - defines the up vector for the entity
     * @returns the new matrix
     */
    static LookAtRH(eye: Vector3, target: Vector3, up: Vector3): Matrix;
    /**
     * Sets the given "result" Matrix to a rotation matrix used to rotate an entity so that it looks at the target vector3, from the eye vector3 position, the up vector3 being oriented like "up".
     * This function works in right handed mode
     * @param eye - defines the final position of the entity
     * @param target - defines where the entity should look at
     * @param up - defines the up vector for the entity
     * @param result - defines the target matrix
     */
    static LookAtRHToRef(eye: Vector3, target: Vector3, up: Vector3, result: Matrix): void;
    /**
     * Create a left-handed orthographic projection matrix
     * @param width - defines the viewport width
     * @param height - defines the viewport height
     * @param znear - defines the near clip plane
     * @param zfar - defines the far clip plane
     * @returns a new matrix as a left-handed orthographic projection matrix
     */
    static OrthoLH(width: number, height: number, znear: number, zfar: number): Matrix;
    /**
     * Store a left-handed orthographic projection to a given matrix
     * @param width - defines the viewport width
     * @param height - defines the viewport height
     * @param znear - defines the near clip plane
     * @param zfar - defines the far clip plane
     * @param result - defines the target matrix
     */
    static OrthoLHToRef(width: number, height: number, znear: number, zfar: number, result: Matrix): void;
    /**
     * Create a left-handed orthographic projection matrix
     * @param left - defines the viewport left coordinate
     * @param right - defines the viewport right coordinate
     * @param bottom - defines the viewport bottom coordinate
     * @param top - defines the viewport top coordinate
     * @param znear - defines the near clip plane
     * @param zfar - defines the far clip plane
     * @returns a new matrix as a left-handed orthographic projection matrix
     */
    static OrthoOffCenterLH(left: number, right: number, bottom: number, top: number, znear: number, zfar: number): Matrix;
    /**
     * Stores a left-handed orthographic projection into a given matrix
     * @param left - defines the viewport left coordinate
     * @param right - defines the viewport right coordinate
     * @param bottom - defines the viewport bottom coordinate
     * @param top - defines the viewport top coordinate
     * @param znear - defines the near clip plane
     * @param zfar - defines the far clip plane
     * @param result - defines the target matrix
     */
    static OrthoOffCenterLHToRef(left: number, right: number, bottom: number, top: number, znear: number, zfar: number, result: Matrix): void;
    /**
     * Creates a right-handed orthographic projection matrix
     * @param left - defines the viewport left coordinate
     * @param right - defines the viewport right coordinate
     * @param bottom - defines the viewport bottom coordinate
     * @param top - defines the viewport top coordinate
     * @param znear - defines the near clip plane
     * @param zfar - defines the far clip plane
     * @returns a new matrix as a right-handed orthographic projection matrix
     */
    static OrthoOffCenterRH(left: number, right: number, bottom: number, top: number, znear: number, zfar: number): Matrix;
    /**
     * Stores a right-handed orthographic projection into a given matrix
     * @param left - defines the viewport left coordinate
     * @param right - defines the viewport right coordinate
     * @param bottom - defines the viewport bottom coordinate
     * @param top - defines the viewport top coordinate
     * @param znear - defines the near clip plane
     * @param zfar - defines the far clip plane
     * @param result - defines the target matrix
     */
    static OrthoOffCenterRHToRef(left: number, right: number, bottom: number, top: number, znear: number, zfar: number, result: Matrix): void;
    /**
     * Creates a left-handed perspective projection matrix
     * @param width - defines the viewport width
     * @param height - defines the viewport height
     * @param znear - defines the near clip plane
     * @param zfar - defines the far clip plane
     * @returns a new matrix as a left-handed perspective projection matrix
     */
    static PerspectiveLH(width: number, height: number, znear: number, zfar: number): Matrix;
    /**
     * Creates a left-handed perspective projection matrix
     * @param fov - defines the horizontal field of view
     * @param aspect - defines the aspect ratio
     * @param znear - defines the near clip plane
     * @param zfar - defines the far clip plane
     * @returns a new matrix as a left-handed perspective projection matrix
     */
    static PerspectiveFovLH(fov: number, aspect: number, znear: number, zfar: number): Matrix;
    /**
     * Stores a left-handed perspective projection into a given matrix
     * @param fov - defines the horizontal field of view
     * @param aspect - defines the aspect ratio
     * @param znear - defines the near clip plane
     * @param zfar - defines the far clip plane
     * @param result - defines the target matrix
     * @param isVerticalFovFixed - defines it the fov is vertically fixed (default) or horizontally
     */
    static PerspectiveFovLHToRef(fov: number, aspect: number, znear: number, zfar: number, result: Matrix, isVerticalFovFixed?: boolean): void;
    /**
     * Creates a right-handed perspective projection matrix
     * @param fov - defines the horizontal field of view
     * @param aspect - defines the aspect ratio
     * @param znear - defines the near clip plane
     * @param zfar - defines the far clip plane
     * @returns a new matrix as a right-handed perspective projection matrix
     */
    static PerspectiveFovRH(fov: number, aspect: number, znear: number, zfar: number): Matrix;
    /**
     * Stores a right-handed perspective projection into a given matrix
     * @param fov - defines the horizontal field of view
     * @param aspect - defines the aspect ratio
     * @param znear - defines the near clip plane
     * @param zfar - defines the far clip plane
     * @param result - defines the target matrix
     * @param isVerticalFovFixed - defines it the fov is vertically fixed (default) or horizontally
     */
    static PerspectiveFovRHToRef(fov: number, aspect: number, znear: number, zfar: number, result: Matrix, isVerticalFovFixed?: boolean): void;
    /**
     * Stores a perspective projection for WebVR info a given matrix
     * @param fov - defines the field of view
     * @param znear - defines the near clip plane
     * @param zfar - defines the far clip plane
     * @param result - defines the target matrix
     * @param rightHanded - defines if the matrix must be in right-handed mode (false by default)
     */
    static PerspectiveFovWebVRToRef(fov: {
        upDegrees: number;
        downDegrees: number;
        leftDegrees: number;
        rightDegrees: number;
    }, znear: number, zfar: number, result: Matrix, rightHanded?: boolean): void;
    /**
     * Extracts a 2x2 matrix from a given matrix and store the result in a FloatArray
     * @param matrix - defines the matrix to use
     * @returns a new FloatArray array with 4 elements : the 2x2 matrix extracted from the given matrix
     */
    static GetAsMatrix2x2(matrix: Matrix): FloatArray;
    /**
     * Extracts a 3x3 matrix from a given matrix and store the result in a FloatArray
     * @param matrix - defines the matrix to use
     * @returns a new FloatArray array with 9 elements : the 3x3 matrix extracted from the given matrix
     */
    static GetAsMatrix3x3(matrix: Matrix): FloatArray;
    /**
     * Compute the transpose of a given matrix
     * @param matrix - defines the matrix to transpose
     * @returns the new matrix
     */
    static Transpose(matrix: Matrix): Matrix;
    /**
     * Compute the transpose of a matrix and store it in a target matrix
     * @param matrix - defines the matrix to transpose
     * @param result - defines the target matrix
     */
    static TransposeToRef(matrix: Matrix, result: Matrix): void;
    /**
     * Computes a reflection matrix from a plane
     * @param plane - defines the reflection plane
     * @returns a new matrix
     */
    static Reflection(plane: Plane): Matrix;
    /**
     * Computes a reflection matrix from a plane
     * @param plane - defines the reflection plane
     * @param result - defines the target matrix
     */
    static ReflectionToRef(plane: Plane, result: Matrix): void;
    /**
     * Sets the given matrix as a rotation matrix composed from the 3 left handed axes
     * @param xaxis - defines the value of the 1st axis
     * @param yaxis - defines the value of the 2nd axis
     * @param zaxis - defines the value of the 3rd axis
     * @param result - defines the target matrix
     */
    static FromXYZAxesToRef(xaxis: Vector3, yaxis: Vector3, zaxis: Vector3, result: Matrix): void;
    /**
     * Creates a rotation matrix from a quaternion and stores it in a target matrix
     * @param quat - defines the quaternion to use
     * @param result - defines the target matrix
     */
    static FromQuaternionToRef(quat: Quaternion, result: Matrix): void;
    /* Excluded from this release type: _markAsUpdated */
    /**
     * Check if the current matrix is identity
     * @returns true is the matrix is the identity matrix
     */
    isIdentity(): boolean;
    /**
     * Check if the current matrix is identity as a texture matrix (3x2 store in 4x4)
     * @returns true is the matrix is the identity matrix
     */
    isIdentityAs3x2(): boolean;
    /**
     * Gets the determinant of the matrix
     * @returns the matrix determinant
     */
    determinant(): number;
    /**
     * Returns the matrix as a FloatArray
     * @returns the matrix underlying array
     */
    toArray(): Readonly<FloatArray>;
    /**
     * Returns the matrix as a FloatArray
     * @returns the matrix underlying array.
     */
    asArray(): Readonly<FloatArray>;
    /**
     * Inverts the current matrix in place
     * @returns the current inverted matrix
     */
    invert(): Matrix;
    /**
     * Sets all the matrix elements to zero
     * @returns the current matrix
     */
    reset(): Matrix;
    /**
     * Adds the current matrix with a second one
     * @param other - defines the matrix to add
     * @returns a new matrix as the addition of the current matrix and the given one
     */
    add(other: Matrix): Matrix;
    /**
     * Sets the given matrix "result" to the addition of the current matrix and the given one
     * @param other - defines the matrix to add
     * @param result - defines the target matrix
     * @returns the current matrix
     */
    addToRef(other: Matrix, result: Matrix): Matrix;
    /**
     * Adds in place the given matrix to the current matrix
     * @param other - defines the second operand
     * @returns the current updated matrix
     */
    addToSelf(other: Matrix): Matrix;
    /**
     * Sets the given matrix to the current inverted Matrix
     * @param other - defines the target matrix
     * @returns the unmodified current matrix
     */
    invertToRef(other: Matrix): Matrix;
    /**
     * add a value at the specified position in the current Matrix
     * @param index - the index of the value within the matrix. between 0 and 15.
     * @param value - the value to be added
     * @returns the current updated matrix
     */
    addAtIndex(index: number, value: number): Matrix;
    /**
     * mutiply the specified position in the current Matrix by a value
     * @param index - the index of the value within the matrix. between 0 and 15.
     * @param value - the value to be added
     * @returns the current updated matrix
     */
    multiplyAtIndex(index: number, value: number): Matrix;
    /**
     * Inserts the translation vector (using 3 floats) in the current matrix
     * @param x - defines the 1st component of the translation
     * @param y - defines the 2nd component of the translation
     * @param z - defines the 3rd component of the translation
     * @returns the current updated matrix
     */
    setTranslationFromFloats(x: number, y: number, z: number): Matrix;
    /**
     * Inserts the translation vector in the current matrix
     * @param vector3 - defines the translation to insert
     * @returns the current updated matrix
     */
    setTranslation(vector3: Vector3): Matrix;
    /**
     * Gets the translation value of the current matrix
     * @returns a new Vector3 as the extracted translation from the matrix
     */
    getTranslation(): Vector3;
    /**
     * Fill a Vector3 with the extracted translation from the matrix
     * @param result - defines the Vector3 where to store the translation
     * @returns the current matrix
     */
    getTranslationToRef(result: Vector3): Matrix;
    /**
     * Remove rotation and scaling part from the matrix
     * @returns the updated matrix
     */
    removeRotationAndScaling(): Matrix;
    /**
     * Multiply two matrices
     * @param other - defines the second operand
     * @returns a new matrix set with the multiplication result of the current Matrix and the given one
     */
    multiply(other: Readonly<Matrix>): Matrix;
    /**
     * Copy the current matrix from the given one
     * @param other - defines the source matrix
     * @returns the current updated matrix
     */
    copyFrom(other: Readonly<Matrix>): Matrix;
    /**
     * Populates the given array from the starting index with the current matrix values
     * @param array - defines the target array
     * @param offset - defines the offset in the target array where to start storing values
     * @returns the current matrix
     */
    copyToArray(array: FloatArray, offset?: number): Matrix;
    /**
     * Sets the given matrix "result" with the multiplication result of the current Matrix and the given one
     * @param other - defines the second operand
     * @param result - defines the matrix where to store the multiplication
     * @returns the current matrix
     */
    multiplyToRef(other: Readonly<Matrix>, result: Matrix): Matrix;
    /**
     * Sets the FloatArray "result" from the given index "offset" with the multiplication of the current matrix and the given one
     * @param other - defines the second operand
     * @param result - defines the array where to store the multiplication
     * @param offset - defines the offset in the target array where to start storing values
     * @returns the current matrix
     */
    multiplyToArray(other: Readonly<Matrix>, result: FloatArray, offset: number): Matrix;
    /**
     * Check equality between this matrix and a second one
     * @param value - defines the second matrix to compare
     * @returns true is the current matrix and the given one values are strictly equal
     */
    equals(value: Matrix): boolean;
    /**
     * Clone the current matrix
     * @returns a new matrix from the current matrix
     */
    clone(): Matrix;
    /**
     * Returns the name of the current matrix class
     * @returns the string "Matrix"
     */
    getClassName(): string;
    /**
     * Gets the hash code of the current matrix
     * @returns the hash code
     */
    getHashCode(): number;
    /**
     * Decomposes the current Matrix into a translation, rotation and scaling components
     * @param scale - defines the scale vector3 given as a reference to update
     * @param rotation - defines the rotation quaternion given as a reference to update
     * @param translation - defines the translation vector3 given as a reference to update
     * @returns true if operation was successful
     */
    decompose(scale?: Vector3, rotation?: Quaternion, translation?: Vector3): boolean;
    /**
     * Gets specific row of the matrix
     * @param index - defines the number of the row to get
     * @returns the index-th row of the current matrix as a new Vector4
     */
    getRow(index: number): Nullable<Vector4>;
    /**
     * Sets the index-th row of the current matrix to the vector4 values
     * @param index - defines the number of the row to set
     * @param row - defines the target vector4
     * @returns the updated current matrix
     */
    setRow(index: number, row: Vector4): Matrix;
    /**
     * Compute the transpose of the matrix
     * @returns the new transposed matrix
     */
    transpose(): Matrix;
    /**
     * Compute the transpose of the matrix and store it in a given matrix
     * @param result - defines the target matrix
     * @returns the current matrix
     */
    transposeToRef(result: Matrix): Matrix;
    /**
     * Sets the index-th row of the current matrix with the given 4 x float values
     * @param index - defines the row index
     * @param x - defines the x component to set
     * @param y - defines the y component to set
     * @param z - defines the z component to set
     * @param w - defines the w component to set
     * @returns the updated current matrix
     */
    setRowFromFloats(index: number, x: number, y: number, z: number, w: number): Matrix;
    /**
     * Compute a new matrix set with the current matrix values multiplied by scale (float)
     * @param scale - defines the scale factor
     * @returns a new matrix
     */
    scale(scale: number): Matrix;
    /**
     * Scale the current matrix values by a factor to a given result matrix
     * @param scale - defines the scale factor
     * @param result - defines the matrix to store the result
     * @returns the current matrix
     */
    scaleToRef(scale: number, result: Matrix): Matrix;
    /**
     * Scale the current matrix values by a factor and add the result to a given matrix
     * @param scale - defines the scale factor
     * @param result - defines the Matrix to store the result
     * @returns the current matrix
     */
    scaleAndAddToRef(scale: number, result: Matrix): Matrix;
    /**
     * Writes to the given matrix a normal matrix, computed from this one (using values from identity matrix for fourth row and column).
     * @param ref - matrix to store the result
     */
    toNormalMatrix(ref: Matrix): void;
    /**
     * Gets only rotation part of the current matrix
     * @returns a new matrix sets to the extracted rotation matrix from the current one
     */
    getRotationMatrix(): Matrix;
    /**
     * Extracts the rotation matrix from the current one and sets it as the given "result"
     * @param result - defines the target matrix to store data to
     * @returns the current matrix
     */
    getRotationMatrixToRef(result: Matrix): Matrix;
    /**
     * Toggles model matrix from being right handed to left handed in place and vice versa
     */
    toggleModelMatrixHandInPlace(): void;
    /**
     * Toggles projection matrix from being right handed to left handed in place and vice versa
     */
    toggleProjectionMatrixHandInPlace(): void;
    /* Excluded from this release type: _updateIdentityStatus */
}

/**
 * @public
 */
declare class MessageBus {
    private messageQueue;
    private connected;
    private flushing;
    constructor();
    on(message: string, callback: (value: any, sender: string) => void): Observer<IEvents['comms']>;
    emit(message: string, payload: Record<any, any>): void;
    private flush;
}

/**
 * @public
 */
declare type MinimapSceneInfo = {
    name: string;
    owner: string;
    description: string;
    previewImageUrl: string | undefined;
    type: number;
    parcels: {
        x: number;
        y: number;
    }[];
    isPOI: boolean;
};

/**
 * Represent a list of observers registered to multiple Observables object.
 * @public
 */
declare class MultiObserver<T> {
    private _observers;
    private _observables;
    /**
     * Raise a callback when one of the observable will notify
     * @param observables - defines a list of observables to watch
     * @param callback - defines the callback to call on notification
     * @param mask - defines the mask used to filter notifications
     * @param scope - defines the current scope used to restore the JS context
     * @returns the new MultiObserver
     */
    static Watch<T>(observables: Observable<T>[], callback: (eventData: T, eventState: ObserverEventState) => void, mask?: number, scope?: any): MultiObserver<T>;
    /**
     * Release associated resources
     */
    dispose(): void;
}

/**
 * Generates a new prefixed id
 * @public
 */
declare function newId(type: string): string;

/**
 * @public
 */
declare class NFTShape extends Shape {
    readonly src: string;
    readonly style: PictureFrameStyle;
    color: Color3;
    constructor(src: string);
    constructor(src: string, color: Color3);
    constructor(src: string, args: NFTShapeConstructorArgs);
}

/** @public */
declare type NFTShapeConstructorArgs = {
    color?: Color3;
    style?: PictureFrameStyle;
};

/** @public */
declare type Nullable<T> = T | null;

/**
 * @public
 */
declare class OBJShape extends Shape {
    readonly src: string;
    constructor(src: string);
}

/**
 * The Observable class is a simple implementation of the Observable pattern.
 *
 * There's one slight particularity though: a given Observable can notify its observer using a particular mask value, only the Observers registered with this mask value will be notified.
 * This enable a more fine grained execution without having to rely on multiple different Observable objects.
 * For instance you may have a given Observable that have four different types of notifications: Move (mask = 0x01), Stop (mask = 0x02), Turn Right (mask = 0X04), Turn Left (mask = 0X08).
 * A given observer can register itself with only Move and Stop (mask = 0x03), then it will only be notified when one of these two occurs and will never be for Turn Left/Right.
 *
 * @public
 */
declare class Observable<T> {
    private _observers;
    private _eventState;
    private _onObserverAdded;
    /**
     * Creates a new observable
     * @param onObserverAdded - defines a callback to call when a new observer is added
     */
    constructor(onObserverAdded?: (observer: Observer<T>) => void);
    /**
     * Create a new Observer with the specified callback
     * @param callback - the callback that will be executed for that Observer
     * @param mask - the mask used to filter observers
     * @param insertFirst - if true the callback will be inserted at the first position, hence executed before the others ones. If false (default behavior) the callback will be inserted at the last position, executed after all the others already present.
     * @param scope - optional scope for the callback to be called from
     * @param unregisterOnFirstCall - defines if the observer as to be unregistered after the next notification
     * @returns the new observer created for the callback
     */
    add(callback: (eventData: T, eventState: ObserverEventState) => void, mask?: number, insertFirst?: boolean, scope?: any, unregisterOnFirstCall?: boolean): null | Observer<T>;
    /**
     * Create a new Observer with the specified callback and unregisters after the next notification
     * @param callback - the callback that will be executed for that Observer
     * @returns the new observer created for the callback
     */
    addOnce(callback: (eventData: T, eventState: ObserverEventState) => void): null | Observer<T>;
    /**
     * Remove an Observer from the Observable object
     * @param observer - the instance of the Observer to remove
     * @returns false if it doesn't belong to this Observable
     */
    remove(observer: null | Observer<T>): boolean;
    /**
     * Remove a callback from the Observable object
     * @param callback - the callback to remove
     * @param scope - optional scope. If used only the callbacks with this scope will be removed
     * @returns false if it doesn't belong to this Observable
     */
    removeCallback(callback: (eventData: T, eventState: ObserverEventState) => void, scope?: any): boolean;
    /**
     * Notify all Observers by calling their respective callback with the given data
     * Will return true if all observers were executed, false if an observer set skipNextObservers to true, then prevent the subsequent ones to execute
     * @param eventData - defines the data to send to all observers
     * @param mask - defines the mask of the current notification (observers with incompatible mask (ie mask & observer.mask === 0) will not be notified)
     * @param target - defines the original target of the state
     * @param currentTarget - defines the current target of the state
     * @returns false if the complete observer chain was not processed (because one observer set the skipNextObservers to true)
     */
    notifyObservers(eventData: T, mask?: number, target?: any, currentTarget?: any): boolean;
    /**
     * Calling this will execute each callback, expecting it to be a promise or return a value.
     * If at any point in the chain one function fails, the promise will fail and the execution will not continue.
     * This is useful when a chain of events (sometimes async events) is needed to initialize a certain object
     * and it is crucial that all callbacks will be executed.
     * The order of the callbacks is kept, callbacks are not executed parallel.
     *
     * @param eventData - The data to be sent to each callback
     * @param mask - is used to filter observers defaults to -1
     * @param target - defines the callback target (see EventState)
     * @param currentTarget - defines he current object in the bubbling phase
     * @returns will return a Promise than resolves when all callbacks executed successfully.
     */
    notifyObserversWithPromise(eventData: T, mask?: number, target?: any, currentTarget?: any): Promise<T>;
    /**
     * Notify a specific observer
     * @param observer - defines the observer to notify
     * @param eventData - defines the data to be sent to each callback
     * @param mask - is used to filter observers defaults to -1
     */
    notifyObserver(observer: Observer<T>, eventData: T, mask?: number): void;
    /**
     * Gets a boolean indicating if the observable has at least one observer
     * @returns true is the Observable has at least one Observer registered
     */
    hasObservers(): boolean;
    /**
     * Clear the list of observers
     */
    clear(): void;
    /**
     * Clone the current observable
     * @returns a new observable
     */
    clone(): Observable<T>;
    /**
     * Does this observable handles observer registered with a given mask
     * @param mask - defines the mask to be tested
     * @returns whether or not one observer registered with the given mask is handeled
     */
    hasSpecificMask(mask?: number): boolean;
    private _deferUnregister;
    private _remove;
}

/**
 * @public
 */
declare class ObservableComponent {
    private subscriptions;
    static component(target: ObservableComponent, propertyKey: string): void;
    static field(target: ObservableComponent, propertyKey: string): void;
    static uiValue(target: ObservableComponent, propertyKey: string): void;
    static readonly(target: ObservableComponent, propertyKey: string): void;
    onChange(fn: ObservableComponentSubscription): this;
    toJSON(): any;
}

/** @public */
declare type ObservableComponentSubscription = (key: string, newVal: any, oldVal: any) => void;

/**
 * Represent an Observer registered to a given Observable object.
 * @public
 */
declare class Observer<T> {
    /**
     * Defines the callback to call when the observer is notified
     */
    callback: (eventData: T, eventState: ObserverEventState) => void;
    /**
     * Defines the mask of the observer (used to filter notifications)
     */
    mask: number;
    /**
     * Defines the current scope used to restore the JS context
     */
    scope: any;
    /**
     * Gets or sets a property defining that the observer as to be unregistered after the next notification
     */
    unregisterOnNextCall: boolean;
    /** For internal usage */
    _willBeUnregistered: boolean;
    /**
     * Creates a new observer
     * @param callback - defines the callback to call when the observer is notified
     * @param mask - defines the mask of the observer (used to filter notifications)
     * @param scope - defines the current scope used to restore the JS context
     */
    constructor(
    /**
     * Defines the callback to call when the observer is notified
     */
    callback: (eventData: T, eventState: ObserverEventState) => void,
    /**
     * Defines the mask of the observer (used to filter notifications)
     */
    mask: number,
    /**
     * Defines the current scope used to restore the JS context
     */
    scope?: any);
}

/**
 * A class serves as a medium between the observable and its observers
 * @public
 */
declare class ObserverEventState {
    /**
     * An Observer can set this property to true to prevent subsequent observers of being notified
     */
    skipNextObservers: boolean;
    /**
     * Get the mask value that were used to trigger the event corresponding to this EventState object
     */
    mask: number;
    /**
     * The object that originally notified the event
     */
    target?: any;
    /**
     * The current object in the bubbling phase
     */
    currentTarget?: any;
    /**
     * This will be populated with the return value of the last function that was executed.
     * If it is the first function in the callback chain it will be the event data.
     */
    lastReturnValue?: any;
    /**
     * Create a new EventState
     * @param mask - defines the mask associated with this state
     * @param skipNextObservers - defines a flag which will instruct the observable to skip following observers when set to true
     * @param target - defines the original target of the state
     * @param currentTarget - defines the current target of the state
     */
    constructor(mask: number, skipNextObservers?: boolean, target?: any, currentTarget?: any);
    /**
     * Initialize the current event state
     * @param mask - defines the mask associated with this state
     * @param skipNextObservers - defines a flag which will instruct the observable to skip following observers when set to true
     * @param target - defines the original target of the state
     * @param currentTarget - defines the current target of the state
     * @returns the current event state
     */
    initalize(mask: number, skipNextObservers?: boolean, target?: any, currentTarget?: any): ObserverEventState;
}

/**
 * @public
 */
declare class OnAnimationEnd extends OnUUIDEvent<'onAnimationEnd'> {
    readonly type: string;
}

/**
 * @public
 */
declare class OnBlur extends OnUUIDEvent<'onBlur'> {
    readonly type: string;
    constructor(callback: (event: IEvents['onBlur']) => void);
}

/**
 * This event is triggered when you change your camera between 1st and 3rd person
 * @public
 */
declare const onCameraModeChangedObservable: Observable<{
    cameraMode: 0 | 1 | 2;
}>;

/**
 * @public
 */
declare class OnChanged extends OnUUIDEvent<'onChange'> {
    readonly type: string;
    constructor(callback: (event: IEvents['onChange']) => void);
}

/**
 * @public @deprecated use `OnPointerDown` instead
 */
declare class OnClick extends OnPointerUUIDEvent<'onClick'> {
    readonly type: string;
    constructor(callback: (event: IEvents['onClick']) => void);
    constructor(callback: (event: IEvents['onClick']) => void, options: OnPointerUUIDEventOptions);
}

/**
 * @public
 */
declare class OnEnter extends OnUUIDEvent<'onEnter'> {
    readonly type: string;
    constructor(callback: (event: IEvents['onEnter']) => void);
}

/** @public @deprecated Use onEnterSceneObservable instead. */
declare const onEnterScene: Observable<{
    userId: string;
}>;

/**
 * These events are triggered after your character enters the scene.
 * @public
 */
declare const onEnterSceneObservable: Observable<{
    userId: string;
}>;

/**
 * @public
 */
declare class OnFocus extends OnUUIDEvent<'onFocus'> {
    readonly type: string;
    constructor(callback: (event: IEvents['onFocus']) => void);
}

/**
 * This event is triggered after the user finalizes dragging a gizmo.
 * @public
 */
declare class OnGizmoEvent extends OnUUIDEvent<'gizmoEvent'> {
    readonly type: string;
}

/**
 * This event is triggered when you change your camera between 1st and 3rd person
 * @public
 */
declare const onIdleStateChangedObservable: Observable<{
    isIdle: boolean;
}>;

/** @public @deprecated Use onLeaveSceneObservable instead. */
declare const onLeaveScene: Observable<{
    userId: string;
}>;

/**
 * These events are triggered after your character leaves the scene.
 * @public
 */
declare const onLeaveSceneObservable: Observable<{
    userId: string;
}>;

/**
 * @public
 */
declare const onPlayerConnectedObservable: Observable<{
    userId: string;
}>;

/**
 * @public
 */
declare const onPlayerDisconnectedObservable: Observable<{
    userId: string;
}>;

/**
 * @public
 */
declare const onPlayerExpressionObservable: Observable<{
    expressionId: string;
}>;

/**
 * @public
 */
declare class OnPointerDown extends OnPointerUUIDEvent<'pointerDown'> {
    readonly type: string;
    constructor(callback: (event: IEvents['pointerDown']) => void);
    constructor(callback: (event: IEvents['pointerDown']) => void, options: OnPointerUUIDEventOptions);
}

/**
 * @public
 */
declare const onPointerLockedStateChange: Observable<{
    locked?: boolean | undefined;
}>;

/**
 * @public
 */
declare class OnPointerUp extends OnPointerUUIDEvent<'pointerUp'> {
    readonly type: string;
    constructor(callback: (event: IEvents['pointerUp']) => void);
    constructor(callback: (event: IEvents['pointerUp']) => void, options: OnPointerUUIDEventOptions);
}

/**
 * @public
 */
declare class OnPointerUUIDEvent<T extends keyof IEvents> extends OnUUIDEvent<T> {
    button: ActionButton;
    hoverText: string;
    distance: number;
    showFeedback: boolean;
    toJSON(): {
        uuid: string;
        type: string | undefined;
        button: ActionButton;
        hoverText: string;
        distance: number;
        showFeedback: boolean;
    };
}

/**
 * @public
 */
declare type OnPointerUUIDEventOptions = {
    button?: ActionButton;
    hoverText?: string;
    showFeedback?: boolean;
    distance?: number;
};

/**
 * @public
 */
declare const onProfileChanged: Observable<{
    ethAddress: string;
    version: number;
}>;

/**
 * @public
 */
declare const onRealmChangedObservable: Observable<{
    domain: string;
    room: string;
    serverName: string;
    displayName: string;
}>;

/**
 * This event is triggered after all the resources of the scene were loaded (models, textures, etc...)
 * @public
 */
declare const onSceneReadyObservable: Observable<{}>;

/**
 * @public
 */
declare class OnTextSubmit extends OnUUIDEvent<'onTextSubmit'> {
    readonly type: string;
    constructor(callback: (event: IEvents['onTextSubmit']) => void);
}

/**
 * @public
 */
declare class OnUUIDEvent<T extends keyof IEvents> extends ObservableComponent {
    callback: (event: any) => void;
    constructor(callback: (event: IEvents[T]) => void);
    static uuidEvent(target: ObservableComponent, propertyKey: string): void;
    toJSON(): {
        uuid: string;
        type: string | undefined;
    };
}

/**
 * @public
 */
declare const onVideoEvent: Observable<{
    componentId: string;
    videoClipId: string;
    videoStatus: number;
    currentOffset: number;
    totalVideoLength: number;
}>;

/**
 * @public
 */
declare function openExternalURL(url: string): void;

/**
 * Popup NFT info dialog
 * @param scr - 'ethereum://contractAddress/tokenID'
 * @param comment - optional. add a comment.
 * @public
 */
declare function openNFTDialog(scr: string, comment?: string | null): void;

/**
 * Defines potential orientation for back face culling
 * @public
 */
declare enum Orientation {
    /**
     * Clockwise
     */
    CW = 0,
    /** Counter clockwise */
    CCW = 1
}

/** @public */
declare type ParcelsWithAccess = Array<{
    x: number;
    y: number;
    role: LandRole;
}>;

/**
 * @public
 */
declare class ParentChanged {
    entity: IEntity;
    parent: IEntity | null;
    constructor(entity: IEntity, parent: IEntity | null);
}

/**
 * Represents a 2D path made up of multiple 2D points
 * @public
 */
declare class Path2 {
    /**
     * If the path start and end point are the same
     */
    closed: boolean;
    private _points;
    private _length;
    /**
     * Creates a Path2 object from the starting 2D coordinates x and y.
     * @param x - the starting points x value
     * @param y - the starting points y value
     */
    constructor(x: number, y: number);
    /**
     * Creates a new path starting from an x and y position
     * @param x - starting x value
     * @param y - starting y value
     * @returns a new Path2 starting at the coordinates (x, y).
     */
    static StartingAt(x: number, y: number): Path2;
    /**
     * Adds a new segment until the given coordinates (x, y) to the current Path2.
     * @param x - the added points x value
     * @param y - the added points y value
     * @returns the updated Path2.
     */
    addLineTo(x: number, y: number): Path2;
    /**
     * Adds _numberOfSegments_ segments according to the arc definition (middle point coordinates, end point coordinates, the arc start point being the current Path2 last point) to the current Path2.
     * @param midX - middle point x value
     * @param midY - middle point y value
     * @param endX - end point x value
     * @param endY - end point y value
     * @param numberOfSegments - (default: 36)
     * @returns the updated Path2.
     */
    addArcTo(midX: number, midY: number, endX: number, endY: number, numberOfSegments?: number): Path2;
    /**
     * Closes the Path2.
     * @returns the Path2.
     */
    close(): Path2;
    /**
     * Gets the sum of the distance between each sequential point in the path
     * @returns the Path2 total length (float).
     */
    length(): number;
    /**
     * Gets the points which construct the path
     * @returns the Path2 internal array of points.
     */
    getPoints(): Vector2[];
    /**
     * Retreives the point at the distance aways from the starting point
     * @param normalizedLengthPosition - the length along the path to retreive the point from
     * @returns a new Vector2 located at a percentage of the Path2 total length on this path.
     */
    getPointAtLengthPosition(normalizedLengthPosition: number): Vector2;
}

/**
 * Represents a 3D path made up of multiple 3D points
 * @public
 */
declare class Path3D {
    /**
     * an array of Vector3, the curve axis of the Path3D
     */
    path: Vector3[];
    private _curve;
    private _distances;
    private _tangents;
    private _normals;
    private _binormals;
    private _raw;
    /**
     * new Path3D(path, normal, raw)
     * Creates a Path3D. A Path3D is a logical math object, so not a mesh.
     * please read the description in the tutorial :  http://doc.babylonjs.com/tutorials/How_to_use_Path3D
     * @param path - an array of Vector3, the curve axis of the Path3D
     * @param normal - (options) Vector3, the first wanted normal to the curve. Ex (0, 1, 0) for a vertical normal.
     * @param raw - (optional, default false) : boolean, if true the returned Path3D isn't normalized. Useful to depict path acceleration or speed.
     */
    constructor(
    /**
     * an array of Vector3, the curve axis of the Path3D
     */
    path: Vector3[], firstNormal?: Nullable<Vector3>, raw?: boolean);
    /**
     * Returns the Path3D array of successive Vector3 designing its curve.
     * @returns the Path3D array of successive Vector3 designing its curve.
     */
    getCurve(): Vector3[];
    /**
     * Returns an array populated with tangent vectors on each Path3D curve point.
     * @returns an array populated with tangent vectors on each Path3D curve point.
     */
    getTangents(): Vector3[];
    /**
     * Returns an array populated with normal vectors on each Path3D curve point.
     * @returns an array populated with normal vectors on each Path3D curve point.
     */
    getNormals(): Vector3[];
    /**
     * Returns an array populated with binormal vectors on each Path3D curve point.
     * @returns an array populated with binormal vectors on each Path3D curve point.
     */
    getBinormals(): Vector3[];
    /**
     * Returns an array populated with distances (float) of the i-th point from the first curve point.
     * @returns an array populated with distances (float) of the i-th point from the first curve point.
     */
    getDistances(): number[];
    /**
     * Forces the Path3D tangent, normal, binormal and distance recomputation.
     * @param path - path which all values are copied into the curves points
     * @param firstNormal - which should be projected onto the curve
     * @returns the same object updated.
     */
    update(path: Vector3[], firstNormal?: Nullable<Vector3>): Path3D;
    private _compute;
    private _getFirstNonNullVector;
    private _getLastNonNullVector;
    private _normalVector;
}

/**
 * @public
 */
declare class PhysicsCast implements IPhysicsCast {
    private static _instance;
    private queries;
    private constructor();
    static get instance(): PhysicsCast;
    static ensureInstance(): any;
    getRayFromCamera(distance: number): Ray;
    getRayFromPositions(from: Vector3, to: Vector3): Ray;
    hitFirst(ray: Ray, hitCallback: (event: RaycastHitEntity) => void, id?: number): void;
    hitAll(ray: Ray, hitCallback: (event: RaycastHitEntities) => void, id?: number): void;
    hitFirstAvatar(_ray: Ray, _hitCallback: (event: RaycastHitAvatar) => void): void;
    hitAllAvatars(_ray: Ray, _hitCallback: (event: RaycastHitAvatars) => void): void;
    handleRaycastHitFirstResponse(response: RaycastResponse<RaycastHitEntity>): void;
    handleRaycastHitAllResponse(response: RaycastResponse<RaycastHitEntities>): void;
}

/** @public */
declare enum PictureFrameStyle {
    Classic = 0,
    Baroque_Ornament = 1,
    Diamond_Ornament = 2,
    Minimal_Wide = 3,
    Minimal_Grey = 4,
    Blocky = 5,
    Gold_Edges = 6,
    Gold_Carved = 7,
    Gold_Wide = 8,
    Gold_Rounded = 9,
    Metal_Medium = 10,
    Metal_Wide = 11,
    Metal_Slim = 12,
    Metal_Rounded = 13,
    Pins = 14,
    Minimal_Black = 15,
    Minimal_White = 16,
    Tape = 17,
    Wood_Slim = 18,
    Wood_Wide = 19,
    Wood_Twigs = 20,
    Canvas = 21,
    None = 22
}

/**
 * Represens a plane by the equation ax + by + cz + d = 0
 * @public
 */
declare class Plane {
    /**
     * Normal of the plane (a,b,c)
     */
    normal: Vector3;
    /**
     * d component of the plane
     */
    d: number;
    /**
     * Creates a Plane object according to the given floats a, b, c, d and the plane equation : ax + by + cz + d = 0
     * @param a - a component of the plane
     * @param b - b component of the plane
     * @param c - c component of the plane
     * @param d - d component of the plane
     */
    constructor(a: number, b: number, c: number, d: number);
    /**
     * Creates a plane from an  array
     * @param array - the array to create a plane from
     * @returns a new Plane from the given array.
     */
    static FromArray(array: ArrayLike<number>): Plane;
    /**
     * Creates a plane from three points
     * @param point1 - point used to create the plane
     * @param point2 - point used to create the plane
     * @param point3 - point used to create the plane
     * @returns a new Plane defined by the three given points.
     */
    static FromPoints(point1: Vector3, point2: Vector3, point3: Vector3): Plane;
    /**
     * Creates a plane from an origin point and a normal
     * @param origin - origin of the plane to be constructed
     * @param normal - normal of the plane to be constructed
     * @returns a new Plane the normal vector to this plane at the given origin point.
     * Note : the vector "normal" is updated because normalized.
     */
    static FromPositionAndNormal(origin: Vector3, normal: Vector3): Plane;
    /**
     * Calculates the distance from a plane and a point
     * @param origin - origin of the plane to be constructed
     * @param normal - normal of the plane to be constructed
     * @param point - point to calculate distance to
     * @returns the signed distance between the plane defined by the normal vector at the "origin"" point and the given other point.
     */
    static SignedDistanceToPlaneFromPositionAndNormal(origin: Vector3, normal: Vector3, point: Vector3): number;
    /**
     * @returns the plane coordinates as a new array of 4 elements [a, b, c, d].
     */
    asArray(): number[];
    /**
     * @returns a new plane copied from the current Plane.
     */
    clone(): Plane;
    /**
     * @returns the string "Plane".
     */
    getClassName(): string;
    /**
     * @returns the Plane hash code.
     */
    getHashCode(): number;
    /**
     * Normalize the current Plane in place.
     * @returns the updated Plane.
     */
    normalize(): Plane;
    /**
     * Applies a transformation the plane and returns the result
     * @param transformation - the transformation matrix to be applied to the plane
     * @returns a new Plane as the result of the transformation of the current Plane by the given matrix.
     */
    transform(transformation: Matrix): Plane;
    /**
     * Calcualtte the dot product between the point and the plane normal
     * @param point - point to calculate the dot product with
     * @returns the dot product (float) of the point coordinates and the plane normal.
     */
    dotCoordinate(point: Vector3): number;
    /**
     * Updates the current Plane from the plane defined by the three given points.
     * @param point1 - one of the points used to contruct the plane
     * @param point2 - one of the points used to contruct the plane
     * @param point3 - one of the points used to contruct the plane
     * @returns the updated Plane.
     */
    copyFromPoints(point1: Vector3, point2: Vector3, point3: Vector3): Plane;
    /**
     * Checks if the plane is facing a given direction
     * @param direction - the direction to check if the plane is facing
     * @param epsilon - value the dot product is compared against (returns true if dot &lt;= epsilon)
     * @returns True is the vector "direction"  is the same side than the plane normal.
     */
    isFrontFacingTo(direction: Vector3, epsilon: number): boolean;
    /**
     * Calculates the distance to a point
     * @param point - point to calculate distance to
     * @returns the signed distance (float) from the given point to the Plane.
     */
    signedDistanceTo(point: Vector3): number;
}

/**
 * @public
 */
declare class PlaneShape extends Shape {
    /**
     * Sets the horizontal length of the plane. Defaults to 1.
     */
    width: number;
    /**
     * Sets the vertical length of the plane. Defaults to 1.
     */
    height: number;
    /**
     * Sets the UV coordinates for the plane.
     * Used to map specific pieces of a Material's texture into the plane's geometry.
     */
    uvs?: number[];
}

/**
 * @public
 */
declare class PointerEvent<GlobalInputEventResult> {
    readonly payload: GlobalInputEventResult;
    constructor(payload: GlobalInputEventResult);
}

/**
 * @public
 */
declare class PointerEventComponent {
    readonly callback: (event: LocalActionButtonEvent) => void;
    constructor(callback: (event: LocalActionButtonEvent) => void);
}

/**
 * @public
 */
declare class PointerEventSystem implements ISystem {
    activate(engine: Engine): void;
    deactivate(): void;
}

/**
 * @public
 */
declare type ProfileForRenderer = {
    userId: string;
    name: string;
    description: string;
    email: string;
    avatar: AvatarForRenderer;
    snapshots: {
        face: string;
        body: string;
    };
    version: number;
    hasConnectedWeb3: boolean;
    updatedAt?: number;
    createdAt?: number;
    parcelsWithAccess?: ParcelsWithAccess;
};

/**
 * Class used to store quaternion data
 * {@link https://en.wikipedia.org/wiki/Quaternion }
 * {@link http://doc.babylonjs.com/features/position,_rotation,_scaling }
 * @public
 */
declare class Quaternion implements EcsMathReadOnlyQuaternion {
    /** defines the first component (0 by default) */
    x: number;
    /** defines the second component (0 by default) */
    y: number;
    /** defines the third component (0 by default) */
    z: number;
    /** defines the fourth component (1.0 by default) */
    w: number;
    /**
     * Creates a new Quaternion from the given floats
     * @param x - defines the first component (0 by default)
     * @param y - defines the second component (0 by default)
     * @param z - defines the third component (0 by default)
     * @param w - defines the fourth component (1.0 by default)
     */
    constructor(
    /** defines the first component (0 by default) */
    x?: number,
    /** defines the second component (0 by default) */
    y?: number,
    /** defines the third component (0 by default) */
    z?: number,
    /** defines the fourth component (1.0 by default) */
    w?: number);
    /**
     * Creates a new quaternion from a rotation matrix
     * @param matrix - defines the source matrix
     * @returns a new quaternion created from the given rotation matrix values
     */
    static FromRotationMatrix(matrix: Matrix): Quaternion;
    /**
     * Updates the given quaternion with the given rotation matrix values
     * @param matrix - defines the source matrix
     * @param result - defines the target quaternion
     */
    static FromRotationMatrixToRef(matrix: Matrix, result: Quaternion): void;
    /**
     * Returns the dot product (float) between the quaternions "left" and "right"
     * @param left - defines the left operand
     * @param right - defines the right operand
     * @returns the dot product
     */
    static Dot(left: EcsMathReadOnlyQuaternion, right: EcsMathReadOnlyQuaternion): number;
    /**
     * Checks if the two quaternions are close to each other
     * @param quat0 - defines the first quaternion to check
     * @param quat1 - defines the second quaternion to check
     * @returns true if the two quaternions are close to each other
     */
    static AreClose(quat0: EcsMathReadOnlyQuaternion, quat1: EcsMathReadOnlyQuaternion): boolean;
    /**
     * Creates an empty quaternion
     * @returns a new quaternion set to (0.0, 0.0, 0.0)
     */
    static Zero(): Quaternion;
    /**
     * Inverse a given quaternion
     * @param q - defines the source quaternion
     * @returns a new quaternion as the inverted current quaternion
     */
    static Inverse(q: Quaternion): Quaternion;
    /**
     * Gets a boolean indicating if the given quaternion is identity
     * @param quaternion - defines the quaternion to check
     * @returns true if the quaternion is identity
     */
    static IsIdentity(quaternion: EcsMathReadOnlyQuaternion): boolean;
    /**
     * Creates a quaternion from a rotation around an axis
     * @param axis - defines the axis to use
     * @param angle - defines the angle to use (in Euler degrees)
     * @returns a new quaternion created from the given axis (Vector3) and angle in radians (float)
     */
    static RotationAxis(axis: Vector3, angle: number): Quaternion;
    /**
     * Creates a rotation around an axis and stores it into the given quaternion
     * @param axis - defines the axis to use
     * @param angle - defines the angle to use (in Euler degrees)
     * @param result - defines the target quaternion
     * @returns the target quaternion
     */
    static RotationAxisToRef(axis: Vector3, angle: number, result: Quaternion): Quaternion;
    /**
     * Creates a new quaternion from data stored into an array
     * @param array - defines the data source
     * @param offset - defines the offset in the source array where the data starts
     * @returns a new quaternion
     */
    static FromArray(array: ArrayLike<number>, offset?: number): Quaternion;
    /**
     * Creates a new quaternion from a set of euler angles and stores it in the target quaternion
     */
    static FromEulerAnglesRef(x: number, y: number, z: number, result: Quaternion): void;
    /**
     * Creates a new quaternion from the given Euler float angles (y, x, z)
     * @param yaw - defines the rotation around Y axis
     * @param pitch - defines the rotation around X axis
     * @param roll - defines the rotation around Z axis
     * @returns the new quaternion
     */
    static RotationYawPitchRoll(yaw: number, pitch: number, roll: number): Quaternion;
    /**
     * Creates a new rotation from the given Euler float angles (y, x, z) and stores it in the target quaternion
     * @param yaw - defines the rotation around Y axis
     * @param pitch - defines the rotation around X axis
     * @param roll - defines the rotation around Z axis
     * @param result - defines the target quaternion
     */
    static RotationYawPitchRollToRef(yaw: number, pitch: number, roll: number, result: Quaternion): void;
    /**
     * Creates a new quaternion from the given Euler float angles expressed in z-x-z orientation
     * @param alpha - defines the rotation around first axis
     * @param beta - defines the rotation around second axis
     * @param gamma - defines the rotation around third axis
     * @returns the new quaternion
     */
    static RotationAlphaBetaGamma(alpha: number, beta: number, gamma: number): Quaternion;
    /**
     * Creates a new quaternion from the given Euler float angles expressed in z-x-z orientation and stores it in the target quaternion
     * @param alpha - defines the rotation around first axis
     * @param beta - defines the rotation around second axis
     * @param gamma - defines the rotation around third axis
     * @param result - defines the target quaternion
     */
    static RotationAlphaBetaGammaToRef(alpha: number, beta: number, gamma: number, result: Quaternion): void;
    /**
     * Creates a new quaternion containing the rotation value to reach the target (axis1, axis2, axis3) orientation as a rotated XYZ system (axis1, axis2 and axis3 are normalized during this operation)
     * @param axis1 - defines the first axis
     * @param axis2 - defines the second axis
     * @param axis3 - defines the third axis
     * @returns the new quaternion
     */
    static RotationQuaternionFromAxis(axis1: Vector3, axis2: Vector3, axis3: Vector3): Quaternion;
    /**
     * Creates a rotation value to reach the target (axis1, axis2, axis3) orientation as a rotated XYZ system (axis1, axis2 and axis3 are normalized during this operation) and stores it in the target quaternion
     * @param axis1 - defines the first axis
     * @param axis2 - defines the second axis
     * @param axis3 - defines the third axis
     * @param ref - defines the target quaternion
     */
    static RotationQuaternionFromAxisToRef(axis1: Vector3, axis2: Vector3, axis3: Vector3, ref: Quaternion): void;
    /**
     * Interpolates between two quaternions
     * @param left - defines first quaternion
     * @param right - defines second quaternion
     * @param amount - defines the gradient to use
     * @returns the new interpolated quaternion
     */
    static Slerp(left: EcsMathReadOnlyQuaternion, right: EcsMathReadOnlyQuaternion, amount: number): Quaternion;
    /**
     * Interpolates between two quaternions and stores it into a target quaternion
     * @param left - defines first quaternion
     * @param right - defines second quaternion
     * @param amount - defines the gradient to use
     * @param result - defines the target quaternion
     */
    static SlerpToRef(left: EcsMathReadOnlyQuaternion, right: EcsMathReadOnlyQuaternion, amount: number, result: Quaternion): void;
    /**
     * Interpolate between two quaternions using Hermite interpolation
     * @param value1 - defines first quaternion
     * @param tangent1 - defines the incoming tangent
     * @param value2 - defines second quaternion
     * @param tangent2 - defines the outgoing tangent
     * @param amount - defines the target quaternion
     * @returns the new interpolated quaternion
     */
    static Hermite(value1: EcsMathReadOnlyQuaternion, tangent1: EcsMathReadOnlyQuaternion, value2: EcsMathReadOnlyQuaternion, tangent2: EcsMathReadOnlyQuaternion, amount: number): Quaternion;
    /**
     * Creates an identity quaternion
     * @returns - the identity quaternion
     */
    static get Identity(): Quaternion;
    /**
     * Returns the angle in degrees between two rotations a and b.
     * @param quat1 - defines the first quaternion
     * @param quat2 - defines the second quaternion
     */
    static Angle(quat1: EcsMathReadOnlyQuaternion, quat2: EcsMathReadOnlyQuaternion): number;
    /**
     * Returns a rotation that rotates z degrees around the z axis, x degrees around the x axis, and y degrees around the y axis.
     * @param x - the rotation on the x axis in euler degrees
     * @param y - the rotation on the y axis in euler degrees
     * @param z - the rotation on the z axis in euler degrees
     */
    static Euler(x: number, y: number, z: number): Quaternion;
    /**
     * Creates a rotation with the specified forward and upwards directions.
     * @param forward - the direction to look in
     * @param up - the vector that defines in which direction up is
     */
    static LookRotation(forward: Vector3, up?: Vector3): Quaternion;
    /**
     * The from quaternion is rotated towards to by an angular step of maxDegreesDelta.
     * @param from - defines the first quaternion
     * @param to - defines the second quaternion
     * @param maxDegreesDelta - the interval step
     */
    static RotateTowards(from: EcsMathReadOnlyQuaternion, to: Quaternion, maxDegreesDelta: number): Quaternion;
    /**
     * Creates a rotation which rotates from fromDirection to toDirection.
     * @param from - defines the first direction Vector
     * @param to - defines the target direction Vector
     */
    static FromToRotation(from: Vector3, to: Vector3, up?: Vector3): Quaternion;
    /**
     * Converts this quaternion to one with the same orientation but with a magnitude of 1.
     */
    get normalized(): Quaternion;
    /**
     * Creates a rotation which rotates from fromDirection to toDirection.
     * @param from - defines the first Vector
     * @param to - defines the second Vector
     * @param up - defines the direction
     */
    setFromToRotation(from: Vector3, to: Vector3, up?: Vector3): void;
    set eulerAngles(euler: Vector3);
    /**
     * Gets or sets the euler angle representation of the rotation.
     * Implemented unity-based calculations from: https://stackoverflow.com/a/56055813
     */
    get eulerAngles(): Vector3;
    /**
     * Gets a string representation for the current quaternion
     * @returns a string with the Quaternion coordinates
     */
    toString(): string;
    /**
     * Gets length of current quaternion
     * @returns the quaternion length (float)
     */
    get length(): number;
    /**
     * Gets length of current quaternion
     * @returns the quaternion length (float)
     */
    get lengthSquared(): number;
    /**
     * Gets the class name of the quaternion
     * @returns the string "Quaternion"
     */
    getClassName(): string;
    /**
     * Gets a hash code for this quaternion
     * @returns the quaternion hash code
     */
    getHashCode(): number;
    /**
     * Copy the quaternion to an array
     * @returns a new array populated with 4 elements from the quaternion coordinates
     */
    asArray(): number[];
    /**
     * Check if two quaternions are equals
     * @param otherQuaternion - defines the second operand
     * @returns true if the current quaternion and the given one coordinates are strictly equals
     */
    equals(otherQuaternion: EcsMathReadOnlyQuaternion): boolean;
    /**
     * Clone the current quaternion
     * @returns a new quaternion copied from the current one
     */
    clone(): Quaternion;
    /**
     * Copy a quaternion to the current one
     * @param other - defines the other quaternion
     * @returns the updated current quaternion
     */
    copyFrom(other: EcsMathReadOnlyQuaternion): Quaternion;
    /**
     * Updates the current quaternion with the given float coordinates
     * @param x - defines the x coordinate
     * @param y - defines the y coordinate
     * @param z - defines the z coordinate
     * @param w - defines the w coordinate
     * @returns the updated current quaternion
     */
    copyFromFloats(x: number, y: number, z: number, w: number): Quaternion;
    /**
     * Updates the current quaternion from the given float coordinates
     * @param x - defines the x coordinate
     * @param y - defines the y coordinate
     * @param z - defines the z coordinate
     * @param w - defines the w coordinate
     * @returns the updated current quaternion
     */
    set(x: number, y: number, z: number, w: number): Quaternion;
    /**
     * Updates the current quaternion from the given euler angles
     * @returns the updated current quaternion
     */
    setEuler(x: number, y: number, z: number): Quaternion;
    /* Excluded from this release type: add */
    /* Excluded from this release type: addInPlace */
    /**
     * Subtract two quaternions
     * @param other - defines the second operand
     * @returns a new quaternion as the subtraction result of the given one from the current one
     */
    subtract(other: Quaternion): Quaternion;
    /**
     * Multiplies the current quaternion by a scale factor
     * @param value - defines the scale factor
     * @returns a new quaternion set by multiplying the current quaternion coordinates by the float "scale"
     */
    scale(value: number): Quaternion;
    /**
     * Scale the current quaternion values by a factor and stores the result to a given quaternion
     * @param scale - defines the scale factor
     * @param result - defines the Quaternion object where to store the result
     * @returns the unmodified current quaternion
     */
    scaleToRef(scale: number, result: Quaternion): Quaternion;
    /**
     * Multiplies in place the current quaternion by a scale factor
     * @param value - defines the scale factor
     * @returns the current modified quaternion
     */
    scaleInPlace(value: number): Quaternion;
    /**
     * Scale the current quaternion values by a factor and add the result to a given quaternion
     * @param scale - defines the scale factor
     * @param result - defines the Quaternion object where to store the result
     * @returns the unmodified current quaternion
     */
    scaleAndAddToRef(scale: number, result: Quaternion): Quaternion;
    /**
     * Multiplies two quaternions
     * @param q1 - defines the second operand
     * @returns a new quaternion set as the multiplication result of the current one with the given one "q1"
     */
    multiply(q1: EcsMathReadOnlyQuaternion): Quaternion;
    /**
     * Sets the given "result" as the the multiplication result of the current one with the given one "q1"
     * @param q1 - defines the second operand
     * @param result - defines the target quaternion
     * @returns the current quaternion
     */
    multiplyToRef(q1: EcsMathReadOnlyQuaternion, result: Quaternion): Quaternion;
    /**
     * Updates the current quaternion with the multiplication of itself with the given one "q1"
     * @param q1 - defines the second operand
     * @returns the currentupdated quaternion
     */
    multiplyInPlace(q1: EcsMathReadOnlyQuaternion): Quaternion;
    /**
     * Conjugates (1-q) the current quaternion and stores the result in the given quaternion
     * @param ref - defines the target quaternion
     * @returns the current quaternion
     */
    conjugateToRef(ref: Quaternion): Quaternion;
    /**
     * Conjugates in place (1-q) the current quaternion
     * @returns the current updated quaternion
     */
    conjugateInPlace(): Quaternion;
    /**
     * Conjugates in place (1-q) the current quaternion
     * @returns a new quaternion
     */
    conjugate(): Quaternion;
    /**
     * Normalize in place the current quaternion
     * @returns the current updated quaternion
     */
    normalize(): Quaternion;
    angleAxis(degress: number, axis: Vector3): Quaternion;
    /**
     * Updates the given rotation matrix with the current quaternion values
     * @param result - defines the target matrix
     * @returns the current unchanged quaternion
     */
    toRotationMatrix(result: Matrix): Quaternion;
    /**
     * Updates the current quaternion from the given rotation matrix values
     * @param matrix - defines the source matrix
     * @returns the current updated quaternion
     */
    fromRotationMatrix(matrix: Matrix): Quaternion;
}

/**
 * @public
 */
declare type QueryType = 'HitFirst' | 'HitAll' | 'HitFirstAvatar' | 'HitAllAvatars';

/**
 * Constant used to convert from radians to Euler degrees
 * @public
 */
declare const RAD2DEG: number;

/**
 * @public
 */
declare interface Ray {
    origin: ReadOnlyVector3;
    direction: ReadOnlyVector3;
    distance: number;
}

/**
 * @public
 */
declare class RaycastEventSystem implements ISystem {
    activate(engine: Engine): void;
    deactivate(): void;
}

/**
 * @public
 */
declare interface RaycastHit {
    didHit: boolean;
    ray: Ray;
    hitPoint: ReadOnlyVector3;
    hitNormal: ReadOnlyVector3;
}

/**
 * @public
 */
declare interface RaycastHitAvatar extends RaycastHit {
    avatar: BasicAvatarInfo;
}

/**
 * @public
 */
declare interface RaycastHitAvatars extends RaycastHit {
    avatars: BasicAvatarInfo[];
}

/**
 * @public
 */
declare interface RaycastHitEntities extends RaycastHit {
    entities: RaycastHitEntity[];
}

/**
 * @public
 */
declare interface RaycastHitEntity extends RaycastHit {
    entity: HitEntityInfo;
}

/**
 * @public
 */
declare class RaycastResponse<T> {
    readonly payload: RaycastResponsePayload<T>;
    constructor(payload: RaycastResponsePayload<T>);
}

/**
 * @public
 */
declare type ReadOnlyColor4 = {
    readonly r: number;
    readonly g: number;
    readonly b: number;
    readonly a: number;
};

/**
 * Scalar computation library
 * @public
 */
declare class Scalar {
    /**
     * Two pi constants convenient for computation.
     */
    static TwoPi: number;
    /**
     * Boolean : true if the absolute difference between a and b is lower than epsilon (default = 1.401298E-45)
     * @param a - number
     * @param b - number
     * @param epsilon - (default = 1.401298E-45)
     * @returns true if the absolute difference between a and b is lower than epsilon (default = 1.401298E-45)
     */
    static WithinEpsilon(a: number, b: number, epsilon?: number): boolean;
    /**
     * Returns a string : the upper case translation of the number i to hexadecimal.
     * @param i - number
     * @returns the upper case translation of the number i to hexadecimal.
     */
    static ToHex(i: number): string;
    /**
     * Returns -1 if value is negative and +1 is value is positive.
     * @param _value - the value
     * @returns the value itself if it's equal to zero.
     */
    static Sign(value: number): number;
    /**
     * Returns the value itself if it's between min and max.
     * Returns min if the value is lower than min.
     * Returns max if the value is greater than max.
     * @param value - the value to clmap
     * @param min - the min value to clamp to (default: 0)
     * @param max - the max value to clamp to (default: 1)
     * @returns the clamped value
     */
    static Clamp(value: number, min?: number, max?: number): number;
    /**
     * the log2 of value.
     * @param value - the value to compute log2 of
     * @returns the log2 of value.
     */
    static Log2(value: number): number;
    /**
     * Loops the value, so that it is never larger than length and never smaller than 0.
     *
     * This is similar to the modulo operator but it works with floating point numbers.
     * For example, using 3.0 for t and 2.5 for length, the result would be 0.5.
     * With t = 5 and length = 2.5, the result would be 0.0.
     * Note, however, that the behaviour is not defined for negative numbers as it is for the modulo operator
     * @param value - the value
     * @param length - the length
     * @returns the looped value
     */
    static Repeat(value: number, length: number): number;
    /**
     * Normalize the value between 0.0 and 1.0 using min and max values
     * @param value - value to normalize
     * @param min - max to normalize between
     * @param max - min to normalize between
     * @returns the normalized value
     */
    static Normalize(value: number, min: number, max: number): number;
    /**
     * Denormalize the value from 0.0 and 1.0 using min and max values
     * @param normalized - value to denormalize
     * @param min - max to denormalize between
     * @param max - min to denormalize between
     * @returns the denormalized value
     */
    static Denormalize(normalized: number, min: number, max: number): number;
    /**
     * Calculates the shortest difference between two given angles given in degrees.
     * @param current - current angle in degrees
     * @param target - target angle in degrees
     * @returns the delta
     */
    static DeltaAngle(current: number, target: number): number;
    /**
     * PingPongs the value t, so that it is never larger than length and never smaller than 0.
     * @param tx - value
     * @param length - length
     * @returns The returned value will move back and forth between 0 and length
     */
    static PingPong(tx: number, length: number): number;
    /**
     * Interpolates between min and max with smoothing at the limits.
     *
     * This function interpolates between min and max in a similar way to Lerp. However, the interpolation will gradually speed up
     * from the start and slow down toward the end. This is useful for creating natural-looking animation, fading and other transitions.
     * @param from - from
     * @param to - to
     * @param tx - value
     * @returns the smooth stepped value
     */
    static SmoothStep(from: number, to: number, tx: number): number;
    /**
     * Moves a value current towards target.
     *
     * This is essentially the same as Mathf.Lerp but instead the function will ensure that the speed never exceeds maxDelta.
     * Negative values of maxDelta pushes the value away from target.
     * @param current - current value
     * @param target - target value
     * @param maxDelta - max distance to move
     * @returns resulting value
     */
    static MoveTowards(current: number, target: number, maxDelta: number): number;
    /**
     * Same as MoveTowards but makes sure the values interpolate correctly when they wrap around 360 degrees.
     *
     * Variables current and target are assumed to be in degrees. For optimization reasons, negative values of maxDelta
     *  are not supported and may cause oscillation. To push current away from a target angle, add 180 to that angle instead.
     * @param current - current value
     * @param target - target value
     * @param maxDelta - max distance to move
     * @returns resulting angle
     */
    static MoveTowardsAngle(current: number, target: number, maxDelta: number): number;
    /**
     * Creates a new scalar with values linearly interpolated of "amount" between the start scalar and the end scalar.
     * @param start - start value
     * @param end - target value
     * @param amount - amount to lerp between
     * @returns the lerped value
     */
    static Lerp(start: number, end: number, amount: number): number;
    /**
     * Same as Lerp but makes sure the values interpolate correctly when they wrap around 360 degrees.
     * The parameter t is clamped to the range [0, 1]. Variables a and b are assumed to be in degrees.
     * @param start - start value
     * @param end - target value
     * @param amount - amount to lerp between
     * @returns the lerped value
     */
    static LerpAngle(start: number, end: number, amount: number): number;
    /**
     * Calculates the linear parameter t that produces the interpolant value within the range [a, b].
     * @param a - start value
     * @param b - target value
     * @param value - value between a and b
     * @returns the inverseLerp value
     */
    static InverseLerp(a: number, b: number, value: number): number;
    /**
     * Returns a new scalar located for "amount" (float) on the Hermite spline defined by the scalars "value1", "value3", "tangent1", "tangent2".
     * {@link http://mathworld.wolfram.com/HermitePolynomial.html}
     * @param value1 - spline value
     * @param tangent1 - spline value
     * @param value2 - spline value
     * @param tangent2 - spline value
     * @param amount - input value
     * @returns hermite result
     */
    static Hermite(value1: number, tangent1: number, value2: number, tangent2: number, amount: number): number;
    /**
     * Returns a random float number between and min and max values
     * @param min - min value of random
     * @param max - max value of random
     * @returns random value
     */
    static RandomRange(min: number, max: number): number;
    /**
     * This function returns percentage of a number in a given range.
     *
     * RangeToPercent(40,20,60) will return 0.5 (50%)
     * RangeToPercent(34,0,100) will return 0.34 (34%)
     * @param num - to convert to percentage
     * @param min - min range
     * @param max - max range
     * @returns the percentage
     */
    static RangeToPercent(num: number, min: number, max: number): number;
    /**
     * This function returns number that corresponds to the percentage in a given range.
     *
     * PercentToRange(0.34,0,100) will return 34.
     * @param percent - to convert to number
     * @param min - min range
     * @param max - max range
     * @returns the number
     */
    static PercentToRange(percent: number, min: number, max: number): number;
    /**
     * Returns the angle converted to equivalent value between -Math.PI and Math.PI radians.
     * @param angle - The angle to normalize in radian.
     * @returns The converted angle.
     */
    static NormalizeRadians(angle: number): number;
}

/**
 * @public
 */
declare class Shape extends ObservableComponent {
    /**
     * Set to true to turn on the collider for the entity.
     */
    withCollisions: boolean;
    /**
     * Set to true to turn on the PointerEvents blocking for the entity.
     */
    isPointerBlocker: boolean;
    /**
     * Defines if the entity and its children should be rendered
     */
    visible: boolean;
}

/**
 * Size containing widht and height
 * @public
 */
declare class Size implements ISize {
    /**
     * The surface of the Size : width * height (float).
     */
    get surface(): number;
    /**
     * Width
     */
    width: number;
    /**
     * Height
     */
    height: number;
    /**
     * Creates a Size object from the given width and height (floats).
     * @param width - width of the new size
     * @param height - height of the new size
     */
    constructor(width: number, height: number);
    /**
     * Create a new size of zero
     * @returns a new Size set to (0.0, 0.0)
     */
    static Zero(): Size;
    /**
     * Creates a new Size set at the linear interpolation "amount" between "start" and "end"
     * @param start - starting size to lerp between
     * @param end - end size to lerp between
     * @param amount - amount to lerp between the start and end values
     * @returns a new Size set at the linear interpolation "amount" between "start" and "end"
     */
    static Lerp(start: Size, end: Size, amount: number): Size;
    /**
     * Returns a string with the Size width and height
     * @returns a string with the Size width and height
     */
    toString(): string;
    /**
     * "Size"
     * @returns the string "Size"
     */
    getClassName(): string;
    /**
     * Returns the Size hash code.
     * @returns a hash code for a unique width and height
     */
    getHashCode(): number;
    /**
     * Updates the current size from the given one.
     * @param src - the given size
     */
    copyFrom(src: Size): void;
    /**
     * Updates in place the current Size from the given floats.
     * @param width - width of the new size
     * @param height - height of the new size
     * @returns the updated Size.
     */
    copyFromFloats(width: number, height: number): Size;
    /**
     * Updates in place the current Size from the given floats.
     * @param width - width to set
     * @param height - height to set
     * @returns the updated Size.
     */
    set(width: number, height: number): Size;
    /**
     * Multiplies the width and height by numbers
     * @param w - factor to multiple the width by
     * @param h - factor to multiple the height by
     * @returns a new Size set with the multiplication result of the current Size and the given floats.
     */
    multiplyByFloats(w: number, h: number): Size;
    /**
     * Clones the size
     * @returns a new Size copied from the given one.
     */
    clone(): Size;
    /**
     * True if the current Size and the given one width and height are strictly equal.
     * @param other - the other size to compare against
     * @returns True if the current Size and the given one width and height are strictly equal.
     */
    equals(other: Size): boolean;
    /**
     * Sums the width and height of two sizes
     * @param otherSize - size to add to this size
     * @returns a new Size set as the addition result of the current Size and the given one.
     */
    add(otherSize: Size): Size;
    /**
     * Subtracts the width and height of two
     * @param otherSize - size to subtract to this size
     * @returns a new Size set as the subtraction result of  the given one from the current Size.
     */
    subtract(otherSize: Size): Size;
}

/**
 * Defines supported spaces
 * @public
 */
declare enum Space {
    /** Local (object) space */
    LOCAL = 0,
    /** World space */
    WORLD = 1,
    /** Bone space */
    BONE = 2
}

/**
 * @public
 */
declare class SphereShape extends Shape {
}

/**
 * @public
 */
declare class Subscription {
    fn: (e: LocalActionButtonEvent) => void;
    useRaycast: boolean;
    constructor(fn: (e: LocalActionButtonEvent) => void, useRaycast: boolean);
}

/** @public */
declare type TaskResult<T> = Promise<T> & {
    isComplete: boolean;
    didFail?: boolean;
    error?: Error;
    result?: T;
};

/**
 * teleport player to a destination
 * @param destination - "coordX,coordY", "magic", "crowd"
 * @public
 */
declare function teleportTo(destination: string): void;

/**
 * @public
 */
declare class TextShape extends ObservableComponent {
    outlineWidth: number;
    outlineColor: Color3;
    color: Color3;
    fontSize: number;
    font?: Font;
    opacity: number;
    value: string;
    lineSpacing: string;
    lineCount: number;
    textWrapping: boolean;
    shadowBlur: number;
    shadowOffsetX: number;
    shadowOffsetY: number;
    shadowColor: Color3;
    hTextAlign: string;
    vTextAlign: string;
    width: number;
    height: number;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    paddingLeft: number;
    billboard: boolean;
    visible: boolean;
    constructor(value?: string);
}

/**
 * @public
 */
declare class Texture extends ObservableComponent {
    readonly src: string;
    /**
     * Enables crisper images based on the provided sampling mode.
     * | Value | Type      |
     * |-------|-----------|
     * |     0 | NEAREST   |
     * |     1 | BILINEAR  |
     * |     2 | TRILINEAR |
     */
    readonly samplingMode: number;
    /**
     * Enables texture wrapping for this material.
     * | Value | Type      |
     * |-------|-----------|
     * |     0 | CLAMP     |
     * |     1 | WRAP      |
     * |     2 | MIRROR    |
     */
    readonly wrap: number;
    /**
     * Defines if this texture has an alpha channel
     */
    readonly hasAlpha: boolean;
    constructor(src: string, opts?: Partial<Pick<Texture, 'samplingMode' | 'wrap' | 'hasAlpha'>>);
}

/**
 * Constant used to convert a value to gamma space
 * @public
 */
declare const ToGammaSpace: number;

/**
 * Constant used to convert a value to linear space
 * @public
 */
declare const ToLinearSpace = 2.2;

/** @public */
declare type TranformConstructorArgs = TransformConstructorArgs;

/**
 * @public
 */
declare class Transform extends ObservableComponent {
    position: Vector3;
    rotation: Quaternion;
    scale: Vector3;
    constructor(args?: TransformConstructorArgs);
    /**
     * @public
     * The rotation as Euler angles in degrees.
     */
    get eulerAngles(): Vector3;
    /**
     * @public
     * Rotates the transform so the forward vector points at target's current position.
     */
    lookAt(target: Vector3, worldUp?: Vector3): this;
    /**
     * @public
     * Applies a rotation of euler angles around the x, y and z axis.
     */
    rotate(axis: Vector3, angle: number): this;
    /**
     * @public
     * Moves the transform in the direction and distance of translation.
     */
    translate(vec: Vector3): this;
}

/** @public */
declare type TransformConstructorArgs = {
    position?: Vector3;
    rotation?: Quaternion;
    scale?: Vector3;
};

/**
 * @public
 */
declare enum TransparencyMode {
    OPAQUE = 0,
    ALPHA_TEST = 1,
    ALPHA_BLEND = 2,
    ALPHA_TEST_AND_BLEND = 3,
    AUTO = 4
}

/**
 * @public
 */
declare class UIButton extends UIShape {
    fontSize: number;
    fontWeight: string;
    thickness: number;
    cornerRadius: number;
    color: Color4;
    background: Color4;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    paddingLeft: number;
    shadowBlur: number;
    shadowOffsetX: number;
    shadowOffsetY: number;
    shadowColor: Color4;
    text: string;
}

/**
 * @public
 */
declare class UICanvas extends UIShape {
    constructor();
}

/**
 * @public
 */
declare class UIContainerRect extends UIShape {
    thickness: number;
    color: Color4;
    alignmentUsesSize: boolean;
}

/**
 * @public
 */
declare class UIContainerStack extends UIShape {
    adaptWidth: boolean;
    adaptHeight: boolean;
    color: Color4;
    stackOrientation: UIStackOrientation;
    spacing: number;
}

/**
 * @public
 */
declare class UIImage extends UIShape {
    sourceLeft: number;
    sourceTop: number;
    sourceWidth: number;
    sourceHeight: number;
    source?: Texture;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    paddingLeft: number;
    sizeInPixels: boolean;
    onClick: OnClick | null;
    constructor(parent: UIShape, source: Texture);
}

/**
 * @public
 */
declare class UIInputText extends UIShape {
    outlineWidth: number;
    outlineColor: Color4;
    color: Color4;
    fontSize: number;
    font?: Font;
    value: string;
    placeholder: string;
    margin: number;
    hTextAlign: string;
    vTextAlign: string;
    focusedBackground: Color4;
    textWrapping: boolean;
    shadowBlur: number;
    shadowOffsetX: number;
    shadowOffsetY: number;
    shadowColor: Color4;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    paddingLeft: number;
    onTextSubmit: OnTextSubmit | null;
    onChanged: OnChanged | null;
    onFocus: OnFocus | null;
    onBlur: OnBlur | null;
    constructor(parent: UIShape | null);
}

/**
 * @public
 */
declare class UIScrollRect extends UIShape {
    valueX: number;
    valueY: number;
    backgroundColor: Color4;
    isHorizontal: boolean;
    isVertical: boolean;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    paddingLeft: number;
    onChanged: OnChanged | null;
}

/**
 * @public
 */
declare abstract class UIShape extends ObservableComponent {
    /**
     * Defines if the entity and its children should be rendered
     */
    name: string | null;
    visible: boolean;
    opacity: number;
    hAlign: string;
    vAlign: string;
    width: string | number;
    height: string | number;
    positionX: string | number;
    positionY: string | number;
    isPointerBlocker: boolean;
    private _parent?;
    constructor(parent: UIShape | null);
    get parent(): UIShape | undefined;
}

/**
 * @public
 */
declare enum UIStackOrientation {
    VERTICAL = 0,
    HORIZONTAL = 1
}

/**
 * @public
 */
declare class UIText extends UIShape {
    outlineWidth: number;
    outlineColor: Color4;
    color: Color4;
    fontSize: number;
    fontAutoSize: boolean;
    font?: Font;
    value: string;
    lineSpacing: number;
    lineCount: number;
    adaptWidth: boolean;
    adaptHeight: boolean;
    textWrapping: boolean;
    shadowBlur: number;
    shadowOffsetX: number;
    shadowOffsetY: number;
    shadowColor: Color4;
    hTextAlign: string;
    vTextAlign: string;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    paddingLeft: number;
}

/**
 * @public
 */
declare class UIValue {
    value: number;
    type: UIValueType;
    constructor(value: string | number);
    toString(): string;
}

/**
 * @public
 */
declare enum UIValueType {
    PERCENT = 0,
    PIXELS = 1
}

/**
 * @public
 */
declare class UUIDEvent<T = any> {
    readonly uuid: string;
    readonly payload: T;
    constructor(uuid: string, payload: T);
}

/**
 * @public
 */
declare class UUIDEventSystem implements ISystem {
    handlerMap: {
        [uuid: string]: OnUUIDEvent<any>;
    };
    activate(engine: Engine): void;
    deactivate(): void;
    onAddEntity(entity: IEntity): void;
    onRemoveEntity(entity: IEntity): void;
    private componentAdded;
    private componentRemoved;
    private handleEvent;
}

/**
 * Class representing a vector containing 2 coordinates
 * @public
 */
declare class Vector2 implements EcsMathReadOnlyVector2 {
    /** defines the first coordinate */
    x: number;
    /** defines the second coordinate */
    y: number;
    /**
     * Creates a new Vector2 from the given x and y coordinates
     * @param x - defines the first coordinate
     * @param y - defines the second coordinate
     */
    constructor(
    /** defines the first coordinate */
    x?: number,
    /** defines the second coordinate */
    y?: number);
    /**
     * Gets a new Vector2(0, 0)
     * @returns a new Vector2
     */
    static Zero(): Vector2;
    /**
     * Gets a new Vector2(1, 1)
     * @returns a new Vector2
     */
    static One(): Vector2;
    /**
     * Returns a new Vector2 as the result of the addition of the two given vectors.
     * @param vector1 - the first vector
     * @param vector2 - the second vector
     * @returns the resulting vector
     */
    static Add(vector1: EcsMathReadOnlyVector2, vector2: EcsMathReadOnlyVector2): Vector2;
    /**
     * Gets a new Vector2 set from the given index element of the given array
     * @param array - defines the data source
     * @param offset - defines the offset in the data source
     * @returns a new Vector2
     */
    static FromArray(array: ArrayLike<number>, offset?: number): Vector2;
    /**
     * Sets "result" from the given index element of the given array
     * @param array - defines the data source
     * @param offset - defines the offset in the data source
     * @param result - defines the target vector
     */
    static FromArrayToRef(array: ArrayLike<number>, offset: number, result: Vector2): void;
    /**
     * Gets a new Vector2 located for "amount" (float) on the CatmullRom spline defined by the given four Vector2
     * @param value1 - defines 1st point of control
     * @param value2 - defines 2nd point of control
     * @param value3 - defines 3rd point of control
     * @param value4 - defines 4th point of control
     * @param amount - defines the interpolation factor
     * @returns a new Vector2
     */
    static CatmullRom(value1: EcsMathReadOnlyVector2, value2: EcsMathReadOnlyVector2, value3: EcsMathReadOnlyVector2, value4: EcsMathReadOnlyVector2, amount: number): Vector2;
    /**
     * Returns a new Vector2 set with same the coordinates than "value" ones if the vector "value" is in the square defined by "min" and "max".
     * If a coordinate of "value" is lower than "min" coordinates, the returned Vector2 is given this "min" coordinate.
     * If a coordinate of "value" is greater than "max" coordinates, the returned Vector2 is given this "max" coordinate
     * @param value - defines the value to clamp
     * @param min - defines the lower limit
     * @param max - defines the upper limit
     * @returns a new Vector2
     */
    static Clamp(value: EcsMathReadOnlyVector2, min: EcsMathReadOnlyVector2, max: EcsMathReadOnlyVector2): Vector2;
    /**
     * Returns a new Vector2 located for "amount" (float) on the Hermite spline defined by the vectors "value1", "value3", "tangent1", "tangent2"
     * @param value1 - defines the 1st control point
     * @param tangent1 - defines the outgoing tangent
     * @param value2 - defines the 2nd control point
     * @param tangent2 - defines the incoming tangent
     * @param amount - defines the interpolation factor
     * @returns a new Vector2
     */
    static Hermite(value1: EcsMathReadOnlyVector2, tangent1: EcsMathReadOnlyVector2, value2: EcsMathReadOnlyVector2, tangent2: EcsMathReadOnlyVector2, amount: number): Vector2;
    /**
     * Returns a new Vector2 located for "amount" (float) on the linear interpolation between the vector "start" adn the vector "end".
     * @param start - defines the start vector
     * @param end - defines the end vector
     * @param amount - defines the interpolation factor
     * @returns a new Vector2
     */
    static Lerp(start: EcsMathReadOnlyVector2, end: EcsMathReadOnlyVector2, amount: number): Vector2;
    /**
     * Gets the dot product of the vector "left" and the vector "right"
     * @param left - defines first vector
     * @param right - defines second vector
     * @returns the dot product (float)
     */
    static Dot(left: EcsMathReadOnlyVector2, right: EcsMathReadOnlyVector2): number;
    /**
     * Returns a new Vector2 equal to the normalized given vector
     * @param vector - defines the vector to normalize
     * @returns a new Vector2
     */
    static Normalize(vector: EcsMathReadOnlyVector2): Vector2;
    /**
     * Gets a new Vector2 set with the minimal coordinate values from the "left" and "right" vectors
     * @param left - defines 1st vector
     * @param right - defines 2nd vector
     * @returns a new Vector2
     */
    static Minimize(left: EcsMathReadOnlyVector2, right: EcsMathReadOnlyVector2): Vector2;
    /**
     * Gets a new Vecto2 set with the maximal coordinate values from the "left" and "right" vectors
     * @param left - defines 1st vector
     * @param right - defines 2nd vector
     * @returns a new Vector2
     */
    static Maximize(left: EcsMathReadOnlyVector2, right: EcsMathReadOnlyVector2): Vector2;
    /**
     * Gets a new Vector2 set with the transformed coordinates of the given vector by the given transformation matrix
     * @param vector - defines the vector to transform
     * @param transformation - defines the matrix to apply
     * @returns a new Vector2
     */
    static Transform(vector: Vector2, transformation: Matrix): Vector2;
    /**
     * Transforms the given vector coordinates by the given transformation matrix and stores the result in the vector "result" coordinates
     * @param vector - defines the vector to transform
     * @param transformation - defines the matrix to apply
     * @param result - defines the target vector
     */
    static TransformToRef(vector: EcsMathReadOnlyVector2, transformation: Matrix, result: Vector2): void;
    /**
     * Determines if a given vector is included in a triangle
     * @param p - defines the vector to test
     * @param p0 - defines 1st triangle point
     * @param p1 - defines 2nd triangle point
     * @param p2 - defines 3rd triangle point
     * @returns true if the point "p" is in the triangle defined by the vertors "p0", "p1", "p2"
     */
    static PointInTriangle(p: EcsMathReadOnlyVector2, p0: EcsMathReadOnlyVector2, p1: EcsMathReadOnlyVector2, p2: EcsMathReadOnlyVector2): boolean;
    /**
     * Gets the distance between the vectors "value1" and "value2"
     * @param value1 - defines first vector
     * @param value2 - defines second vector
     * @returns the distance between vectors
     */
    static Distance(value1: Vector2, value2: Vector2): number;
    /**
     * Returns the squared distance between the vectors "value1" and "value2"
     * @param value1 - defines first vector
     * @param value2 - defines second vector
     * @returns the squared distance between vectors
     */
    static DistanceSquared(value1: EcsMathReadOnlyVector2, value2: EcsMathReadOnlyVector2): number;
    /**
     * Gets a new Vector2 located at the center of the vectors "value1" and "value2"
     * @param value1 - defines first vector
     * @param value2 - defines second vector
     * @returns a new Vector2
     */
    static Center(value1: EcsMathReadOnlyVector2, value2: EcsMathReadOnlyVector2): Vector2;
    /**
     * Gets the shortest distance (float) between the point "p" and the segment defined by the two points "segA" and "segB".
     * @param p - defines the middle point
     * @param segA - defines one point of the segment
     * @param segB - defines the other point of the segment
     * @returns the shortest distance
     */
    static DistanceOfPointFromSegment(p: Vector2, segA: Vector2, segB: Vector2): number;
    /**
     * Gets a string with the Vector2 coordinates
     * @returns a string with the Vector2 coordinates
     */
    toString(): string;
    /**
     * Gets class name
     * @returns the string "Vector2"
     */
    getClassName(): string;
    /**
     * Gets current vector hash code
     * @returns the Vector2 hash code as a number
     */
    getHashCode(): number;
    /**
     * Sets the Vector2 coordinates in the given array or FloatArray from the given index.
     * @param array - defines the source array
     * @param index - defines the offset in source array
     * @returns the current Vector2
     */
    toArray(array: FloatArray, index?: number): Vector2;
    /**
     * Copy the current vector to an array
     * @returns a new array with 2 elements: the Vector2 coordinates.
     */
    asArray(): number[];
    /**
     * Sets the Vector2 coordinates with the given Vector2 coordinates
     * @param source - defines the source Vector2
     * @returns the current updated Vector2
     */
    copyFrom(source: EcsMathReadOnlyVector2): Vector2;
    /**
     * Sets the Vector2 coordinates with the given floats
     * @param x - defines the first coordinate
     * @param y - defines the second coordinate
     * @returns the current updated Vector2
     */
    copyFromFloats(x: number, y: number): Vector2;
    /**
     * Sets the Vector2 coordinates with the given floats
     * @param x - defines the first coordinate
     * @param y - defines the second coordinate
     * @returns the current updated Vector2
     */
    set(x: number, y: number): Vector2;
    /**
     * Add another vector with the current one
     * @param otherVector - defines the other vector
     * @returns a new Vector2 set with the addition of the current Vector2 and the given one coordinates
     */
    add(otherVector: EcsMathReadOnlyVector2): Vector2;
    /**
     * Sets the "result" coordinates with the addition of the current Vector2 and the given one coordinates
     * @param otherVector - defines the other vector
     * @param result - defines the target vector
     * @returns the unmodified current Vector2
     */
    addToRef(otherVector: EcsMathReadOnlyVector2, result: Vector2): Vector2;
    /**
     * Set the Vector2 coordinates by adding the given Vector2 coordinates
     * @param otherVector - defines the other vector
     * @returns the current updated Vector2
     */
    addInPlace(otherVector: EcsMathReadOnlyVector2): Vector2;
    /**
     * Gets a new Vector2 by adding the current Vector2 coordinates to the given Vector3 x, y coordinates
     * @param otherVector - defines the other vector
     * @returns a new Vector2
     */
    addVector3(otherVector: EcsMathReadOnlyVector2): Vector2;
    /**
     * Gets a new Vector2 set with the subtracted coordinates of the given one from the current Vector2
     * @param otherVector - defines the other vector
     * @returns a new Vector2
     */
    subtract(otherVector: EcsMathReadOnlyVector2): Vector2;
    /**
     * Sets the "result" coordinates with the subtraction of the given one from the current Vector2 coordinates.
     * @param otherVector - defines the other vector
     * @param result - defines the target vector
     * @returns the unmodified current Vector2
     */
    subtractToRef(otherVector: EcsMathReadOnlyVector2, result: Vector2): Vector2;
    /**
     * Sets the current Vector2 coordinates by subtracting from it the given one coordinates
     * @param otherVector - defines the other vector
     * @returns the current updated Vector2
     */
    subtractInPlace(otherVector: EcsMathReadOnlyVector2): Vector2;
    /**
     * Multiplies in place the current Vector2 coordinates by the given ones
     * @param otherVector - defines the other vector
     * @returns the current updated Vector2
     */
    multiplyInPlace(otherVector: EcsMathReadOnlyVector2): Vector2;
    /**
     * Returns a new Vector2 set with the multiplication of the current Vector2 and the given one coordinates
     * @param otherVector - defines the other vector
     * @returns a new Vector2
     */
    multiply(otherVector: EcsMathReadOnlyVector2): Vector2;
    /**
     * Sets "result" coordinates with the multiplication of the current Vector2 and the given one coordinates
     * @param otherVector - defines the other vector
     * @param result - defines the target vector
     * @returns the unmodified current Vector2
     */
    multiplyToRef(otherVector: EcsMathReadOnlyVector2, result: Vector2): Vector2;
    /**
     * Gets a new Vector2 set with the Vector2 coordinates multiplied by the given floats
     * @param x - defines the first coordinate
     * @param y - defines the second coordinate
     * @returns a new Vector2
     */
    multiplyByFloats(x: number, y: number): Vector2;
    /**
     * Returns a new Vector2 set with the Vector2 coordinates divided by the given one coordinates
     * @param otherVector - defines the other vector
     * @returns a new Vector2
     */
    divide(otherVector: EcsMathReadOnlyVector2): Vector2;
    /**
     * Sets the "result" coordinates with the Vector2 divided by the given one coordinates
     * @param otherVector - defines the other vector
     * @param result - defines the target vector
     * @returns the unmodified current Vector2
     */
    divideToRef(otherVector: EcsMathReadOnlyVector2, result: Vector2): Vector2;
    /**
     * Divides the current Vector2 coordinates by the given ones
     * @param otherVector - defines the other vector
     * @returns the current updated Vector2
     */
    divideInPlace(otherVector: EcsMathReadOnlyVector2): Vector2;
    /**
     * Gets a new Vector2 with current Vector2 negated coordinates
     * @returns a new Vector2
     */
    negate(): Vector2;
    /**
     * Multiply the Vector2 coordinates by scale
     * @param scale - defines the scaling factor
     * @returns the current updated Vector2
     */
    scaleInPlace(scale: number): Vector2;
    /**
     * Returns a new Vector2 scaled by "scale" from the current Vector2
     * @param scale - defines the scaling factor
     * @returns a new Vector2
     */
    scale(scale: number): Vector2;
    /**
     * Scale the current Vector2 values by a factor to a given Vector2
     * @param scale - defines the scale factor
     * @param result - defines the Vector2 object where to store the result
     * @returns the unmodified current Vector2
     */
    scaleToRef(scale: number, result: Vector2): Vector2;
    /**
     * Scale the current Vector2 values by a factor and add the result to a given Vector2
     * @param scale - defines the scale factor
     * @param result - defines the Vector2 object where to store the result
     * @returns the unmodified current Vector2
     */
    scaleAndAddToRef(scale: number, result: Vector2): Vector2;
    /**
     * Gets a boolean if two vectors are equals
     * @param otherVector - defines the other vector
     * @returns true if the given vector coordinates strictly equal the current Vector2 ones
     */
    equals(otherVector: EcsMathReadOnlyVector2): boolean;
    /**
     * Gets a boolean if two vectors are equals (using an epsilon value)
     * @param otherVector - defines the other vector
     * @param epsilon - defines the minimal distance to consider equality
     * @returns true if the given vector coordinates are close to the current ones by a distance of epsilon.
     */
    equalsWithEpsilon(otherVector: EcsMathReadOnlyVector2, epsilon?: number): boolean;
    /**
     * Gets a new Vector2 from current Vector2 floored values
     * @returns a new Vector2
     */
    floor(): Vector2;
    /**
     * Gets a new Vector2 from current Vector2 floored values
     * @returns a new Vector2
     */
    fract(): Vector2;
    /**
     * Gets the length of the vector
     * @returns the vector length (float)
     */
    length(): number;
    /**
     * Gets the vector squared length
     * @returns the vector squared length (float)
     */
    lengthSquared(): number;
    /**
     * Normalize the vector
     * @returns the current updated Vector2
     */
    normalize(): Vector2;
    /**
     * Gets a new Vector2 copied from the Vector2
     * @returns a new Vector2
     */
    clone(): Vector2;
}

/**
 * Classed used to store (x,y,z) vector representation
 * A Vector3 is the main object used in 3D geometry
 * It can represent etiher the coordinates of a point the space, either a direction
 * Reminder: Babylon.js uses a left handed forward facing system
 * @public
 */
declare class Vector3 implements EcsMathReadOnlyVector3 {
    /**
     * Defines the first coordinates (on X axis)
     */
    x: number;
    /**
     * Defines the second coordinates (on Y axis)
     */
    y: number;
    /**
     * Defines the third coordinates (on Z axis)
     */
    z: number;
    /**
     * Gets a boolean indicating that the vector is non uniform meaning x, y or z are not all the same
     */
    get isNonUniform(): boolean;
    /**
     * Creates a new Vector3 object from the given x, y, z (floats) coordinates.
     * @param x - defines the first coordinates (on X axis)
     * @param y - defines the second coordinates (on Y axis)
     * @param z - defines the third coordinates (on Z axis)
     */
    constructor(
    /**
     * Defines the first coordinates (on X axis)
     */
    x?: number,
    /**
     * Defines the second coordinates (on Y axis)
     */
    y?: number,
    /**
     * Defines the third coordinates (on Z axis)
     */
    z?: number);
    /**
     * Returns a new Vector3 as the result of the addition of the two given vectors.
     * @param vector1 - the first vector
     * @param vector2 - the second vector
     * @returns the resulting vector
     */
    static Add(vector1: EcsMathReadOnlyVector3, vector2: EcsMathReadOnlyVector3): Vector3;
    /**
     * Get the clip factor between two vectors
     * @param vector0 - defines the first operand
     * @param vector1 - defines the second operand
     * @param axis - defines the axis to use
     * @param size - defines the size along the axis
     * @returns the clip factor
     */
    static GetClipFactor(vector0: EcsMathReadOnlyVector3, vector1: EcsMathReadOnlyVector3, axis: EcsMathReadOnlyVector3, size: number): number;
    /**
     * Get angle between two vectors
     * @param vector0 - angle between vector0 and vector1
     * @param vector1 - angle between vector0 and vector1
     * @param normal - direction of the normal
     * @returns the angle between vector0 and vector1
     */
    static GetAngleBetweenVectors(vector0: Vector3, vector1: Vector3, normal: EcsMathReadOnlyVector3): number;
    /**
     * Returns a new Vector3 set from the index "offset" of the given array
     * @param array - defines the source array
     * @param offset - defines the offset in the source array
     * @returns the new Vector3
     */
    static FromArray(array: ArrayLike<number>, offset?: number): Vector3;
    /**
     * Returns a new Vector3 set from the index "offset" of the given FloatArray
     * This function is deprecated.  Use FromArray instead
     * @param array - defines the source array
     * @param offset - defines the offset in the source array
     * @returns the new Vector3
     */
    static FromFloatArray(array: FloatArray, offset?: number): Vector3;
    /**
     * Sets the given vector "result" with the element values from the index "offset" of the given array
     * @param array - defines the source array
     * @param offset - defines the offset in the source array
     * @param result - defines the Vector3 where to store the result
     */
    static FromArrayToRef(array: ArrayLike<number>, offset: number, result: Vector3): void;
    /**
     * Sets the given vector "result" with the element values from the index "offset" of the given FloatArray
     * This function is deprecated.  Use FromArrayToRef instead.
     * @param array - defines the source array
     * @param offset - defines the offset in the source array
     * @param result - defines the Vector3 where to store the result
     */
    static FromFloatArrayToRef(array: FloatArray, offset: number, result: Vector3): void;
    /**
     * Sets the given vector "result" with the given floats.
     * @param x - defines the x coordinate of the source
     * @param y - defines the y coordinate of the source
     * @param z - defines the z coordinate of the source
     * @param result - defines the Vector3 where to store the result
     */
    static FromFloatsToRef(x: number, y: number, z: number, result: Vector3): void;
    /**
     * Returns a new Vector3 set to (0.0, 0.0, 0.0)
     * @returns a new empty Vector3
     */
    static Zero(): Vector3;
    /**
     * Returns a new Vector3 set to (1.0, 1.0, 1.0)
     * @returns a new unit Vector3
     */
    static One(): Vector3;
    /**
     * Returns a new Vector3 set to (0.0, 1.0, 0.0)
     * @returns a new up Vector3
     */
    static Up(): Vector3;
    /**
     * Returns a new Vector3 set to (0.0, -1.0, 0.0)
     * @returns a new down Vector3
     */
    static Down(): Vector3;
    /**
     * Returns a new Vector3 set to (0.0, 0.0, 1.0)
     * @returns a new forward Vector3
     */
    static Forward(): Vector3;
    /**
     * Returns a new Vector3 set to (0.0, 0.0, -1.0)
     * @returns a new forward Vector3
     */
    static Backward(): Vector3;
    /**
     * Returns a new Vector3 set to (1.0, 0.0, 0.0)
     * @returns a new right Vector3
     */
    static Right(): Vector3;
    /**
     * Returns a new Vector3 set to (-1.0, 0.0, 0.0)
     * @returns a new left Vector3
     */
    static Left(): Vector3;
    /**
     * Returns a new Vector3 set with the result of the transformation by the given matrix of the given vector.
     * This method computes tranformed coordinates only, not transformed direction vectors (ie. it takes translation in account)
     * @param vector - defines the Vector3 to transform
     * @param transformation - defines the transformation matrix
     * @returns the transformed Vector3
     */
    static TransformCoordinates(vector: EcsMathReadOnlyVector3, transformation: Matrix): Vector3;
    /**
     * Sets the given vector "result" coordinates with the result of the transformation by the given matrix of the given vector
     * This method computes tranformed coordinates only, not transformed direction vectors (ie. it takes translation in account)
     * @param vector - defines the Vector3 to transform
     * @param transformation - defines the transformation matrix
     * @param result - defines the Vector3 where to store the result
     */
    static TransformCoordinatesToRef(vector: EcsMathReadOnlyVector3, transformation: Readonly<Matrix>, result: Vector3): void;
    /**
     * Sets the given vector "result" coordinates with the result of the transformation by the given matrix of the given floats (x, y, z)
     * This method computes tranformed coordinates only, not transformed direction vectors
     * @param x - define the x coordinate of the source vector
     * @param y - define the y coordinate of the source vector
     * @param z - define the z coordinate of the source vector
     * @param transformation - defines the transformation matrix
     * @param result - defines the Vector3 where to store the result
     */
    static TransformCoordinatesFromFloatsToRef(x: number, y: number, z: number, transformation: Readonly<Matrix>, result: Vector3): void;
    /**
     * Returns a new Vector3 set with the result of the normal transformation by the given matrix of the given vector
     * This methods computes transformed normalized direction vectors only (ie. it does not apply translation)
     * @param vector - defines the Vector3 to transform
     * @param transformation - defines the transformation matrix
     * @returns the new Vector3
     */
    static TransformNormal(vector: EcsMathReadOnlyVector3, transformation: Matrix): Vector3;
    /**
     * Sets the given vector "result" with the result of the normal transformation by the given matrix of the given vector
     * This methods computes transformed normalized direction vectors only (ie. it does not apply translation)
     * @param vector - defines the Vector3 to transform
     * @param transformation - defines the transformation matrix
     * @param result - defines the Vector3 where to store the result
     */
    static TransformNormalToRef(vector: EcsMathReadOnlyVector3, transformation: Readonly<Matrix>, result: Vector3): void;
    /**
     * Sets the given vector "result" with the result of the normal transformation by the given matrix of the given floats (x, y, z)
     * This methods computes transformed normalized direction vectors only (ie. it does not apply translation)
     * @param x - define the x coordinate of the source vector
     * @param y - define the y coordinate of the source vector
     * @param z - define the z coordinate of the source vector
     * @param transformation - defines the transformation matrix
     * @param result - defines the Vector3 where to store the result
     */
    static TransformNormalFromFloatsToRef(x: number, y: number, z: number, transformation: Readonly<Matrix>, result: Vector3): void;
    /**
     * Returns a new Vector3 located for "amount" on the CatmullRom interpolation spline defined by the vectors "value1", "value2", "value3", "value4"
     * @param value1 - defines the first control point
     * @param value2 - defines the second control point
     * @param value3 - defines the third control point
     * @param value4 - defines the fourth control point
     * @param amount - defines the amount on the spline to use
     * @returns the new Vector3
     */
    static CatmullRom(value1: EcsMathReadOnlyVector3, value2: EcsMathReadOnlyVector3, value3: EcsMathReadOnlyVector3, value4: EcsMathReadOnlyVector3, amount: number): Vector3;
    /**
     * Returns a new Vector3 set with the coordinates of "value", if the vector "value" is in the cube defined by the vectors "min" and "max"
     * If a coordinate value of "value" is lower than one of the "min" coordinate, then this "value" coordinate is set with the "min" one
     * If a coordinate value of "value" is greater than one of the "max" coordinate, then this "value" coordinate is set with the "max" one
     * @param value - defines the current value
     * @param min - defines the lower range value
     * @param max - defines the upper range value
     * @returns the new Vector3
     */
    static Clamp(value: EcsMathReadOnlyVector3, min: EcsMathReadOnlyVector3, max: EcsMathReadOnlyVector3): Vector3;
    /**
     * Sets the given vector "result" with the coordinates of "value", if the vector "value" is in the cube defined by the vectors "min" and "max"
     * If a coordinate value of "value" is lower than one of the "min" coordinate, then this "value" coordinate is set with the "min" one
     * If a coordinate value of "value" is greater than one of the "max" coordinate, then this "value" coordinate is set with the "max" one
     * @param value - defines the current value
     * @param min - defines the lower range value
     * @param max - defines the upper range value
     * @param result - defines the Vector3 where to store the result
     */
    static ClampToRef(value: EcsMathReadOnlyVector3, min: EcsMathReadOnlyVector3, max: EcsMathReadOnlyVector3, result: Vector3): void;
    /**
     * Returns a new Vector3 located for "amount" (float) on the Hermite interpolation spline defined by the vectors "value1", "tangent1", "value2", "tangent2"
     * @param value1 - defines the first control point
     * @param tangent1 - defines the first tangent vector
     * @param value2 - defines the second control point
     * @param tangent2 - defines the second tangent vector
     * @param amount - defines the amount on the interpolation spline (between 0 and 1)
     * @returns the new Vector3
     */
    static Hermite(value1: EcsMathReadOnlyVector3, tangent1: EcsMathReadOnlyVector3, value2: EcsMathReadOnlyVector3, tangent2: EcsMathReadOnlyVector3, amount: number): Vector3;
    /**
     * Returns a new Vector3 located for "amount" (float) on the linear interpolation between the vectors "start" and "end"
     * @param start - defines the start value
     * @param end - defines the end value
     * @param amount - max defines amount between both (between 0 and 1)
     * @returns the new Vector3
     */
    static Lerp(start: EcsMathReadOnlyVector3, end: EcsMathReadOnlyVector3, amount: number): Vector3;
    /**
     * Sets the given vector "result" with the result of the linear interpolation from the vector "start" for "amount" to the vector "end"
     * @param start - defines the start value
     * @param end - defines the end value
     * @param amount - max defines amount between both (between 0 and 1)
     * @param result - defines the Vector3 where to store the result
     */
    static LerpToRef(start: EcsMathReadOnlyVector3, end: EcsMathReadOnlyVector3, amount: number, result: Vector3): void;
    /**
     * Returns the dot product (float) between the vectors "left" and "right"
     * @param left - defines the left operand
     * @param right - defines the right operand
     * @returns the dot product
     */
    static Dot(left: EcsMathReadOnlyVector3, right: EcsMathReadOnlyVector3): number;
    /**
     * Returns a new Vector3 as the cross product of the vectors "left" and "right"
     * The cross product is then orthogonal to both "left" and "right"
     * @param left - defines the left operand
     * @param right - defines the right operand
     * @returns the cross product
     */
    static Cross(left: EcsMathReadOnlyVector3, right: EcsMathReadOnlyVector3): Vector3;
    /**
     * Sets the given vector "result" with the cross product of "left" and "right"
     * The cross product is then orthogonal to both "left" and "right"
     * @param left - defines the left operand
     * @param right - defines the right operand
     * @param result - defines the Vector3 where to store the result
     */
    static CrossToRef(left: EcsMathReadOnlyVector3, right: EcsMathReadOnlyVector3, result: Vector3): void;
    /**
     * Returns a new Vector3 as the normalization of the given vector
     * @param vector - defines the Vector3 to normalize
     * @returns the new Vector3
     */
    static Normalize(vector: Vector3): Vector3;
    /**
     * Sets the given vector "result" with the normalization of the given first vector
     * @param vector - defines the Vector3 to normalize
     * @param result - defines the Vector3 where to store the result
     */
    static NormalizeToRef(vector: Vector3, result: Vector3): void;
    /**
     * Gets the minimal coordinate values between two Vector3
     * @param left - defines the first operand
     * @param right - defines the second operand
     * @returns the new Vector3
     */
    static Minimize(left: EcsMathReadOnlyVector3, right: EcsMathReadOnlyVector3): Vector3;
    /**
     * Gets the maximal coordinate values between two Vector3
     * @param left - defines the first operand
     * @param right - defines the second operand
     * @returns the new Vector3
     */
    static Maximize(left: Vector3, right: Vector3): Vector3;
    /**
     * Returns the distance between the vectors "value1" and "value2"
     * @param value1 - defines the first operand
     * @param value2 - defines the second operand
     * @returns the distance
     */
    static Distance(value1: EcsMathReadOnlyVector3, value2: EcsMathReadOnlyVector3): number;
    /**
     * Returns the squared distance between the vectors "value1" and "value2"
     * @param value1 - defines the first operand
     * @param value2 - defines the second operand
     * @returns the squared distance
     */
    static DistanceSquared(value1: EcsMathReadOnlyVector3, value2: EcsMathReadOnlyVector3): number;
    /**
     * Returns a new Vector3 located at the center between "value1" and "value2"
     * @param value1 - defines the first operand
     * @param value2 - defines the second operand
     * @returns the new Vector3
     */
    static Center(value1: EcsMathReadOnlyVector3, value2: EcsMathReadOnlyVector3): Vector3;
    /**
     * Given three orthogonal normalized left-handed oriented Vector3 axis in space (target system),
     * RotationFromAxis() returns the rotation Euler angles (ex : rotation.x, rotation.y, rotation.z) to apply
     * to something in order to rotate it from its local system to the given target system
     * Note: axis1, axis2 and axis3 are normalized during this operation
     * @param axis1 - defines the first axis
     * @param axis2 - defines the second axis
     * @param axis3 - defines the third axis
     * @returns a new Vector3
     */
    static RotationFromAxis(axis1: Vector3, axis2: Vector3, axis3: Vector3): Vector3;
    /**
     * The same than RotationFromAxis but updates the given ref Vector3 parameter instead of returning a new Vector3
     * @param axis1 - defines the first axis
     * @param axis2 - defines the second axis
     * @param axis3 - defines the third axis
     * @param ref - defines the Vector3 where to store the result
     */
    static RotationFromAxisToRef(axis1: Vector3, axis2: Vector3, axis3: Vector3, ref: Vector3): void;
    /**
     * Creates a string representation of the Vector3
     * @returns a string with the Vector3 coordinates.
     */
    toString(): string;
    /**
     * Gets the class name
     * @returns the string "Vector3"
     */
    getClassName(): string;
    /**
     * Creates the Vector3 hash code
     * @returns a number which tends to be unique between Vector3 instances
     */
    getHashCode(): number;
    /**
     * Creates an array containing three elements : the coordinates of the Vector3
     * @returns a new array of numbers
     */
    asArray(): number[];
    /**
     * Populates the given array or FloatArray from the given index with the successive coordinates of the Vector3
     * @param array - defines the destination array
     * @param index - defines the offset in the destination array
     * @returns the current Vector3
     */
    toArray(array: FloatArray, index?: number): Vector3;
    /**
     * Converts the current Vector3 into a quaternion (considering that the Vector3 contains Euler angles representation of a rotation)
     * @returns a new Quaternion object, computed from the Vector3 coordinates
     */
    toQuaternion(): Quaternion;
    /**
     * Adds the given vector to the current Vector3
     * @param otherVector - defines the second operand
     * @returns the current updated Vector3
     */
    addInPlace(otherVector: EcsMathReadOnlyVector3): Vector3;
    /**
     * Adds the given coordinates to the current Vector3
     * @param x - defines the x coordinate of the operand
     * @param y - defines the y coordinate of the operand
     * @param z - defines the z coordinate of the operand
     * @returns the current updated Vector3
     */
    addInPlaceFromFloats(x: number, y: number, z: number): Vector3;
    /**
     * Gets a new Vector3, result of the addition the current Vector3 and the given vector
     * @param otherVector - defines the second operand
     * @returns the resulting Vector3
     */
    add(otherVector: EcsMathReadOnlyVector3): Vector3;
    /**
     * Adds the current Vector3 to the given one and stores the result in the vector "result"
     * @param otherVector - defines the second operand
     * @param result - defines the Vector3 object where to store the result
     * @returns the current Vector3
     */
    addToRef(otherVector: EcsMathReadOnlyVector3, result: Vector3): Vector3;
    /**
     * Subtract the given vector from the current Vector3
     * @param otherVector - defines the second operand
     * @returns the current updated Vector3
     */
    subtractInPlace(otherVector: EcsMathReadOnlyVector3): Vector3;
    /**
     * Returns a new Vector3, result of the subtraction of the given vector from the current Vector3
     * @param otherVector - defines the second operand
     * @returns the resulting Vector3
     */
    subtract(otherVector: EcsMathReadOnlyVector3): Vector3;
    /**
     * Subtracts the given vector from the current Vector3 and stores the result in the vector "result".
     * @param otherVector - defines the second operand
     * @param result - defines the Vector3 object where to store the result
     * @returns the current Vector3
     */
    subtractToRef(otherVector: EcsMathReadOnlyVector3, result: Vector3): Vector3;
    /**
     * Returns a new Vector3 set with the subtraction of the given floats from the current Vector3 coordinates
     * @param x - defines the x coordinate of the operand
     * @param y - defines the y coordinate of the operand
     * @param z - defines the z coordinate of the operand
     * @returns the resulting Vector3
     */
    subtractFromFloats(x: number, y: number, z: number): Vector3;
    /**
     * Subtracts the given floats from the current Vector3 coordinates and set the given vector "result" with this result
     * @param x - defines the x coordinate of the operand
     * @param y - defines the y coordinate of the operand
     * @param z - defines the z coordinate of the operand
     * @param result - defines the Vector3 object where to store the result
     * @returns the current Vector3
     */
    subtractFromFloatsToRef(x: number, y: number, z: number, result: Vector3): Vector3;
    /**
     * Multiplies this vector (with an implicit 1 in the 4th dimension) and m, and divides by perspective
     * @param matrix - The transformation matrix
     */
    applyMatrix4(matrix: Matrix): void;
    /**
     * Multiplies this vector (with an implicit 1 in the 4th dimension) and m, and divides by perspective and set the given vector "result" with this result
     * @param matrix - The transformation matrix
     * @param result - defines the Vector3 object where to store the result
     * @returns the current Vector3
     */
    applyMatrix4ToRef(matrix: Matrix, result: Vector3): Vector3;
    /**
     * Rotates the current Vector3 based on the given quaternion
     * @param q - defines the Quaternion
     * @returns the current Vector3
     */
    rotate(q: Quaternion): Vector3;
    /**
     * Rotates current Vector3 based on the given quaternion, but applies the rotation to target Vector3.
     * @param q - defines the Quaternion
     * @param result - defines the target Vector3
     * @returns the current Vector3
     */
    rotateToRef(q: Quaternion, result: Vector3): Vector3;
    /**
     * Gets a new Vector3 set with the current Vector3 negated coordinates
     * @returns a new Vector3
     */
    negate(): Vector3;
    /**
     * Multiplies the Vector3 coordinates by the float "scale"
     * @param scale - defines the multiplier factor
     * @returns the current updated Vector3
     */
    scaleInPlace(scale: number): Vector3;
    /**
     * Returns a new Vector3 set with the current Vector3 coordinates multiplied by the float "scale"
     * @param scale - defines the multiplier factor
     * @returns a new Vector3
     */
    scale(scale: number): Vector3;
    /**
     * Multiplies the current Vector3 coordinates by the float "scale" and stores the result in the given vector "result" coordinates
     * @param scale - defines the multiplier factor
     * @param result - defines the Vector3 object where to store the result
     * @returns the current Vector3
     */
    scaleToRef(scale: number, result: Vector3): Vector3;
    /**
     * Scale the current Vector3 values by a factor and add the result to a given Vector3
     * @param scale - defines the scale factor
     * @param result - defines the Vector3 object where to store the result
     * @returns the unmodified current Vector3
     */
    scaleAndAddToRef(scale: number, result: Vector3): Vector3;
    /**
     * Returns true if the current Vector3 and the given vector coordinates are strictly equal
     * @param otherVector - defines the second operand
     * @returns true if both vectors are equals
     */
    equals(otherVector: EcsMathReadOnlyVector3): boolean;
    /**
     * Returns true if the current Vector3 and the given vector coordinates are distant less than epsilon
     * @param otherVector - defines the second operand
     * @param epsilon - defines the minimal distance to define values as equals
     * @returns true if both vectors are distant less than epsilon
     */
    equalsWithEpsilon(otherVector: EcsMathReadOnlyVector3, epsilon?: number): boolean;
    /**
     * Returns true if the current Vector3 coordinates equals the given floats
     * @param x - defines the x coordinate of the operand
     * @param y - defines the y coordinate of the operand
     * @param z - defines the z coordinate of the operand
     * @returns true if both vectors are equals
     */
    equalsToFloats(x: number, y: number, z: number): boolean;
    /**
     * Multiplies the current Vector3 coordinates by the given ones
     * @param otherVector - defines the second operand
     * @returns the current updated Vector3
     */
    multiplyInPlace(otherVector: EcsMathReadOnlyVector3): Vector3;
    /**
     * Returns a new Vector3, result of the multiplication of the current Vector3 by the given vector
     * @param otherVector - defines the second operand
     * @returns the new Vector3
     */
    multiply(otherVector: EcsMathReadOnlyVector3): Vector3;
    /**
     * Multiplies the current Vector3 by the given one and stores the result in the given vector "result"
     * @param otherVector - defines the second operand
     * @param result - defines the Vector3 object where to store the result
     * @returns the current Vector3
     */
    multiplyToRef(otherVector: EcsMathReadOnlyVector3, result: Vector3): Vector3;
    /**
     * Returns a new Vector3 set with the result of the mulliplication of the current Vector3 coordinates by the given floats
     * @param x - defines the x coordinate of the operand
     * @param y - defines the y coordinate of the operand
     * @param z - defines the z coordinate of the operand
     * @returns the new Vector3
     */
    multiplyByFloats(x: number, y: number, z: number): Vector3;
    /**
     * Returns a new Vector3 set with the result of the division of the current Vector3 coordinates by the given ones
     * @param otherVector - defines the second operand
     * @returns the new Vector3
     */
    divide(otherVector: EcsMathReadOnlyVector3): Vector3;
    /**
     * Divides the current Vector3 coordinates by the given ones and stores the result in the given vector "result"
     * @param otherVector - defines the second operand
     * @param result - defines the Vector3 object where to store the result
     * @returns the current Vector3
     */
    divideToRef(otherVector: EcsMathReadOnlyVector3, result: Vector3): Vector3;
    /**
     * Divides the current Vector3 coordinates by the given ones.
     * @param otherVector - defines the second operand
     * @returns the current updated Vector3
     */
    divideInPlace(otherVector: EcsMathReadOnlyVector3): Vector3;
    /**
     * Updates the current Vector3 with the minimal coordinate values between its and the given vector ones
     * @param other - defines the second operand
     * @returns the current updated Vector3
     */
    minimizeInPlace(other: EcsMathReadOnlyVector3): Vector3;
    /**
     * Updates the current Vector3 with the maximal coordinate values between its and the given vector ones.
     * @param other - defines the second operand
     * @returns the current updated Vector3
     */
    maximizeInPlace(other: EcsMathReadOnlyVector3): Vector3;
    /**
     * Updates the current Vector3 with the minimal coordinate values between its and the given coordinates
     * @param x - defines the x coordinate of the operand
     * @param y - defines the y coordinate of the operand
     * @param z - defines the z coordinate of the operand
     * @returns the current updated Vector3
     */
    minimizeInPlaceFromFloats(x: number, y: number, z: number): Vector3;
    /**
     * Updates the current Vector3 with the maximal coordinate values between its and the given coordinates.
     * @param x - defines the x coordinate of the operand
     * @param y - defines the y coordinate of the operand
     * @param z - defines the z coordinate of the operand
     * @returns the current updated Vector3
     */
    maximizeInPlaceFromFloats(x: number, y: number, z: number): Vector3;
    /**
     * Gets a new Vector3 from current Vector3 floored values
     * @returns a new Vector3
     */
    floor(): Vector3;
    /**
     * Gets a new Vector3 from current Vector3 floored values
     * @returns a new Vector3
     */
    fract(): Vector3;
    /**
     * Gets the length of the Vector3
     * @returns the length of the Vecto3
     */
    length(): number;
    /**
     * Gets the squared length of the Vector3
     * @returns squared length of the Vector3
     */
    lengthSquared(): number;
    /**
     * Normalize the current Vector3.
     * Please note that this is an in place operation.
     * @returns the current updated Vector3
     */
    normalize(): Vector3;
    /**
     * Normalize the current Vector3 with the given input length.
     * Please note that this is an in place operation.
     * @param len - the length of the vector
     * @returns the current updated Vector3
     */
    normalizeFromLength(len: number): Vector3;
    /**
     * Normalize the current Vector3 to a new vector
     * @returns the new Vector3
     */
    normalizeToNew(): Vector3;
    /**
     * Normalize the current Vector3 to the reference
     * @param reference - define the Vector3 to update
     * @returns the updated Vector3
     */
    normalizeToRef(reference: Vector3): Vector3;
    /**
     * Creates a new Vector3 copied from the current Vector3
     * @returns the new Vector3
     */
    clone(): Vector3;
    /**
     * Copies the given vector coordinates to the current Vector3 ones
     * @param source - defines the source Vector3
     * @returns the current updated Vector3
     */
    copyFrom(source: EcsMathReadOnlyVector3): Vector3;
    /**
     * Copies the given floats to the current Vector3 coordinates
     * @param x - defines the x coordinate of the operand
     * @param y - defines the y coordinate of the operand
     * @param z - defines the z coordinate of the operand
     * @returns the current updated Vector3
     */
    copyFromFloats(x: number, y: number, z: number): Vector3;
    /**
     * Copies the given floats to the current Vector3 coordinates
     * @param x - defines the x coordinate of the operand
     * @param y - defines the y coordinate of the operand
     * @param z - defines the z coordinate of the operand
     * @returns the current updated Vector3
     */
    set(x: number, y: number, z: number): Vector3;
    /**
     * Copies the given float to the current Vector3 coordinates
     * @param v - defines the x, y and z coordinates of the operand
     * @returns the current updated Vector3
     */
    setAll(v: number): Vector3;
}

/**
 * Vector4 class created for EulerAngle class conversion to Quaternion
 * @public
 */
declare class Vector4 implements EcsMathReadOnlyVector4 {
    /** x value of the vector */
    x: number;
    /** y value of the vector */
    y: number;
    /** z value of the vector */
    z: number;
    /** w value of the vector */
    w: number;
    /**
     * Creates a Vector4 object from the given floats.
     * @param x - x value of the vector
     * @param y - y value of the vector
     * @param z - z value of the vector
     * @param w - w value of the vector
     */
    constructor(
    /** x value of the vector */
    x: number,
    /** y value of the vector */
    y: number,
    /** z value of the vector */
    z: number,
    /** w value of the vector */
    w: number);
    /**
     * Returns a new Vector4 as the result of the addition of the two given vectors.
     * @param vector1 - the first vector
     * @param vector2 - the second vector
     * @returns the resulting vector
     */
    static Add(vector1: EcsMathReadOnlyVector4, vector2: EcsMathReadOnlyVector4): Vector4;
    /**
     * Returns a new Vector4 set from the starting index of the given array.
     * @param array - the array to pull values from
     * @param offset - the offset into the array to start at
     * @returns the new vector
     */
    static FromArray(array: ArrayLike<number>, offset?: number): Vector4;
    /**
     * Updates the given vector "result" from the starting index of the given array.
     * @param array - the array to pull values from
     * @param offset - the offset into the array to start at
     * @param result - the vector to store the result in
     */
    static FromArrayToRef(array: ArrayLike<number>, offset: number, result: Vector4): void;
    /**
     * Updates the given vector "result" from the starting index of the given FloatArray.
     * @param array - the array to pull values from
     * @param offset - the offset into the array to start at
     * @param result - the vector to store the result in
     */
    static FromFloatArrayToRef(array: FloatArray, offset: number, result: Vector4): void;
    /**
     * Updates the given vector "result" coordinates from the given floats.
     * @param x - float to set from
     * @param y - float to set from
     * @param z - float to set from
     * @param w - float to set from
     * @param result - the vector to the floats in
     */
    static FromFloatsToRef(x: number, y: number, z: number, w: number, result: Vector4): void;
    /**
     * Returns a new Vector4 set to (0.0, 0.0, 0.0, 0.0)
     * @returns the new vector
     */
    static Zero(): Vector4;
    /**
     * Returns a new Vector4 set to (1.0, 1.0, 1.0, 1.0)
     * @returns the new vector
     */
    static One(): Vector4;
    /**
     * Returns a new normalized Vector4 from the given one.
     * @param vector - the vector to normalize
     * @returns the vector
     */
    static Normalize(vector: EcsMathReadOnlyVector4): Vector4;
    /**
     * Updates the given vector "result" from the normalization of the given one.
     * @param vector - the vector to normalize
     * @param result - the vector to store the result in
     */
    static NormalizeToRef(vector: EcsMathReadOnlyVector4, result: Vector4): void;
    /**
     * Returns a vector with the minimum values from the left and right vectors
     * @param left - left vector to minimize
     * @param right - right vector to minimize
     * @returns a new vector with the minimum of the left and right vector values
     */
    static Minimize(left: EcsMathReadOnlyVector4, right: EcsMathReadOnlyVector4): Vector4;
    /**
     * Returns a vector with the maximum values from the left and right vectors
     * @param left - left vector to maximize
     * @param right - right vector to maximize
     * @returns a new vector with the maximum of the left and right vector values
     */
    static Maximize(left: EcsMathReadOnlyVector4, right: EcsMathReadOnlyVector4): Vector4;
    /**
     * Returns the distance (float) between the vectors "value1" and "value2".
     * @param value1 - value to calulate the distance between
     * @param value2 - value to calulate the distance between
     * @returns the distance between the two vectors
     */
    static Distance(value1: EcsMathReadOnlyVector4, value2: EcsMathReadOnlyVector4): number;
    /**
     * Returns the squared distance (float) between the vectors "value1" and "value2".
     * @param value1 - value to calulate the distance between
     * @param value2 - value to calulate the distance between
     * @returns the distance between the two vectors squared
     */
    static DistanceSquared(value1: EcsMathReadOnlyVector4, value2: EcsMathReadOnlyVector4): number;
    /**
     * Returns a new Vector4 located at the center between the vectors "value1" and "value2".
     * @param value1 - value to calulate the center between
     * @param value2 - value to calulate the center between
     * @returns the center between the two vectors
     */
    static Center(value1: EcsMathReadOnlyVector4, value2: EcsMathReadOnlyVector4): Vector4;
    /**
     * Returns a new Vector4 set with the result of the normal transformation by the given matrix of the given vector.
     * This methods computes transformed normalized direction vectors only.
     * @param vector - the vector to transform
     * @param transformation - the transformation matrix to apply
     * @returns the new vector
     */
    static TransformNormal(vector: EcsMathReadOnlyVector4, transformation: Matrix): Vector4;
    /**
     * Sets the given vector "result" with the result of the normal transformation by the given matrix of the given vector.
     * This methods computes transformed normalized direction vectors only.
     * @param vector - the vector to transform
     * @param transformation - the transformation matrix to apply
     * @param result - the vector to store the result in
     */
    static TransformNormalToRef(vector: EcsMathReadOnlyVector4, transformation: Matrix, result: Vector4): void;
    /**
     * Sets the given vector "result" with the result of the normal transformation by the given matrix of the given floats (x, y, z, w).
     * This methods computes transformed normalized direction vectors only.
     * @param x - value to transform
     * @param y - value to transform
     * @param z - value to transform
     * @param w - value to transform
     * @param transformation - the transformation matrix to apply
     * @param result - the vector to store the results in
     */
    static TransformNormalFromFloatsToRef(x: number, y: number, z: number, w: number, transformation: Matrix, result: Vector4): void;
    /**
     * Returns the string with the Vector4 coordinates.
     * @returns a string containing all the vector values
     */
    toString(): string;
    /**
     * Returns the string "Vector4".
     * @returns "Vector4"
     */
    getClassName(): string;
    /**
     * Returns the Vector4 hash code.
     * @returns a unique hash code
     */
    getHashCode(): number;
    /**
     * Returns a new array populated with 4 elements : the Vector4 coordinates.
     * @returns the resulting array
     */
    asArray(): number[];
    /**
     * Populates the given array from the given index with the Vector4 coordinates.
     * @param array - array to populate
     * @param index - index of the array to start at (default: 0)
     * @returns the Vector4.
     */
    toArray(array: FloatArray, index?: number): Vector4;
    /**
     * Adds the given vector to the current Vector4.
     * @param otherVector - the vector to add
     * @returns the updated Vector4.
     */
    addInPlace(otherVector: EcsMathReadOnlyVector4): Vector4;
    /**
     * Returns a new Vector4 as the result of the addition of the current Vector4 and the given one.
     * @param otherVector - the vector to add
     * @returns the resulting vector
     */
    add(otherVector: EcsMathReadOnlyVector4): Vector4;
    /**
     * Updates the given vector "result" with the result of the addition of the current Vector4 and the given one.
     * @param otherVector - the vector to add
     * @param result - the vector to store the result
     * @returns the current Vector4.
     */
    addToRef(otherVector: EcsMathReadOnlyVector4, result: Vector4): Vector4;
    /**
     * Subtract in place the given vector from the current Vector4.
     * @param otherVector - the vector to subtract
     * @returns the updated Vector4.
     */
    subtractInPlace(otherVector: EcsMathReadOnlyVector4): Vector4;
    /**
     * Returns a new Vector4 with the result of the subtraction of the given vector from the current Vector4.
     * @param otherVector - the vector to add
     * @returns the new vector with the result
     */
    subtract(otherVector: EcsMathReadOnlyVector4): Vector4;
    /**
     * Sets the given vector "result" with the result of the subtraction of the given vector from the current Vector4.
     * @param otherVector - the vector to subtract
     * @param result - the vector to store the result
     * @returns the current Vector4.
     */
    subtractToRef(otherVector: EcsMathReadOnlyVector4, result: Vector4): Vector4;
    /**
     * Returns a new Vector4 set with the result of the subtraction of the given floats from the current Vector4 coordinates.
     */
    /**
     * Returns a new Vector4 set with the result of the subtraction of the given floats from the current Vector4 coordinates.
     * @param x - value to subtract
     * @param y - value to subtract
     * @param z - value to subtract
     * @param w - value to subtract
     * @returns new vector containing the result
     */
    subtractFromFloats(x: number, y: number, z: number, w: number): Vector4;
    /**
     * Sets the given vector "result" set with the result of the subtraction of the given floats from the current Vector4 coordinates.
     * @param x - value to subtract
     * @param y - value to subtract
     * @param z - value to subtract
     * @param w - value to subtract
     * @param result - the vector to store the result in
     * @returns the current Vector4.
     */
    subtractFromFloatsToRef(x: number, y: number, z: number, w: number, result: Vector4): Vector4;
    /**
     * Returns a new Vector4 set with the current Vector4 negated coordinates.
     * @returns a new vector with the negated values
     */
    negate(): Vector4;
    /**
     * Multiplies the current Vector4 coordinates by scale (float).
     * @param scale - the number to scale with
     * @returns the updated Vector4.
     */
    scaleInPlace(scale: number): Vector4;
    /**
     * Returns a new Vector4 set with the current Vector4 coordinates multiplied by scale (float).
     * @param scale - the number to scale with
     * @returns a new vector with the result
     */
    scale(scale: number): Vector4;
    /**
     * Sets the given vector "result" with the current Vector4 coordinates multiplied by scale (float).
     * @param scale - the number to scale with
     * @param result - a vector to store the result in
     * @returns the current Vector4.
     */
    scaleToRef(scale: number, result: Vector4): Vector4;
    /**
     * Scale the current Vector4 values by a factor and add the result to a given Vector4
     * @param scale - defines the scale factor
     * @param result - defines the Vector4 object where to store the result
     * @returns the unmodified current Vector4
     */
    scaleAndAddToRef(scale: number, result: Vector4): Vector4;
    /**
     * Boolean : True if the current Vector4 coordinates are stricly equal to the given ones.
     * @param otherVector - the vector to compare against
     * @returns true if they are equal
     */
    equals(otherVector: EcsMathReadOnlyVector4): boolean;
    /**
     * Boolean : True if the current Vector4 coordinates are each beneath the distance "epsilon" from the given vector ones.
     * @param otherVector - vector to compare against
     * @param epsilon - (Default: very small number)
     * @returns true if they are equal
     */
    equalsWithEpsilon(otherVector: EcsMathReadOnlyVector4, epsilon?: number): boolean;
    /**
     * Boolean : True if the given floats are strictly equal to the current Vector4 coordinates.
     * @param x - x value to compare against
     * @param y - y value to compare against
     * @param z - z value to compare against
     * @param w - w value to compare against
     * @returns true if equal
     */
    equalsToFloats(x: number, y: number, z: number, w: number): boolean;
    /**
     * Multiplies in place the current Vector4 by the given one.
     * @param otherVector - vector to multiple with
     * @returns the updated Vector4.
     */
    multiplyInPlace(otherVector: EcsMathReadOnlyVector4): Vector4;
    /**
     * Returns a new Vector4 set with the multiplication result of the current Vector4 and the given one.
     * @param otherVector - vector to multiple with
     * @returns resulting new vector
     */
    multiply(otherVector: EcsMathReadOnlyVector4): Vector4;
    /**
     * Updates the given vector "result" with the multiplication result of the current Vector4 and the given one.
     * @param otherVector - vector to multiple with
     * @param result - vector to store the result
     * @returns the current Vector4.
     */
    multiplyToRef(otherVector: EcsMathReadOnlyVector4, result: Vector4): Vector4;
    /**
     * Returns a new Vector4 set with the multiplication result of the given floats and the current Vector4 coordinates.
     * @param x - x value multiply with
     * @param y - y value multiply with
     * @param z - z value multiply with
     * @param w - w value multiply with
     * @returns resulting new vector
     */
    multiplyByFloats(x: number, y: number, z: number, w: number): Vector4;
    /**
     * Returns a new Vector4 set with the division result of the current Vector4 by the given one.
     * @param otherVector - vector to devide with
     * @returns resulting new vector
     */
    divide(otherVector: EcsMathReadOnlyVector4): Vector4;
    /**
     * Updates the given vector "result" with the division result of the current Vector4 by the given one.
     * @param otherVector - vector to devide with
     * @param result - vector to store the result
     * @returns the current Vector4.
     */
    divideToRef(otherVector: EcsMathReadOnlyVector4, result: Vector4): Vector4;
    /**
     * Divides the current Vector3 coordinates by the given ones.
     * @param otherVector - vector to devide with
     * @returns the updated Vector3.
     */
    divideInPlace(otherVector: EcsMathReadOnlyVector4): Vector4;
    /**
     * Updates the Vector4 coordinates with the minimum values between its own and the given vector ones
     * @param other - defines the second operand
     * @returns the current updated Vector4
     */
    minimizeInPlace(other: EcsMathReadOnlyVector4): Vector4;
    /**
     * Updates the Vector4 coordinates with the maximum values between its own and the given vector ones
     * @param other - defines the second operand
     * @returns the current updated Vector4
     */
    maximizeInPlace(other: EcsMathReadOnlyVector4): Vector4;
    /**
     * Gets a new Vector4 from current Vector4 floored values
     * @returns a new Vector4
     */
    floor(): Vector4;
    /**
     * Gets a new Vector4 from current Vector3 floored values
     * @returns a new Vector4
     */
    fract(): Vector4;
    /**
     * Returns the Vector4 length (float).
     * @returns the length
     */
    length(): number;
    /**
     * Returns the Vector4 squared length (float).
     * @returns the length squared
     */
    lengthSquared(): number;
    /**
     * Normalizes in place the Vector4.
     * @returns the updated Vector4.
     */
    normalize(): Vector4;
    /**
     * Returns a new Vector3 from the Vector4 (x, y, z) coordinates.
     * @returns this converted to a new vector3
     */
    toVector3(): Vector3;
    /**
     * Returns a new Vector4 copied from the current one.
     * @returns the new cloned vector
     */
    clone(): Vector4;
    /**
     * Updates the current Vector4 with the given one coordinates.
     * @param source - the source vector to copy from
     * @returns the updated Vector4.
     */
    copyFrom(source: EcsMathReadOnlyVector4): Vector4;
    /**
     * Updates the current Vector4 coordinates with the given floats.
     * @param x - float to copy from
     * @param y - float to copy from
     * @param z - float to copy from
     * @param w - float to copy from
     * @returns the updated Vector4.
     */
    copyFromFloats(x: number, y: number, z: number, w: number): Vector4;
    /**
     * Updates the current Vector4 coordinates with the given floats.
     * @param x - float to set from
     * @param y - float to set from
     * @param z - float to set from
     * @param w - float to set from
     * @returns the updated Vector4.
     */
    set(x: number, y: number, z: number, w: number): Vector4;
    /**
     * Copies the given float to the current Vector3 coordinates
     * @param v - defines the x, y, z and w coordinates of the operand
     * @returns the current updated Vector3
     */
    setAll(v: number): Vector4;
}

/**
 * @public
 */
declare class VideoClip extends ObservableComponent {
    readonly url: string;
    constructor(url: string);
}

/** @public */
declare enum VideoStatus {
    NONE = 0,
    ERROR = 1,
    LOADING = 2,
    READY = 3,
    PLAYING = 4,
    BUFFERING = 5
}

/**
 * @public
 */
declare class VideoTexture extends ObservableComponent {
    readonly videoClipId: string;
    /**
     * Enables crisper images based on the provided sampling mode.
     * | Value | Type      |
     * |-------|-----------|
     * |     1 | NEAREST   |
     * |     2 | BILINEAR  |
     * |     3 | TRILINEAR |
     */
    readonly samplingMode: number;
    /**
     * Enables texture wrapping for this material.
     * | Value | Type      |
     * |-------|-----------|
     * |     1 | CLAMP     |
     * |     2 | WRAP      |
     * |     3 | MIRROR    |
     */
    readonly wrap: number;
    volume: number;
    playbackRate: number;
    loop: boolean;
    seek: number;
    private _position;
    private _videoLength;
    private _status;
    /**
     * Is this VideoTexture playing?
     */
    playing: boolean;
    constructor(videoClip: VideoClip, opts?: Partial<Pick<VideoTexture, 'samplingMode' | 'wrap'>>);
    play(): void;
    pause(): void;
    reset(): void;
    seekTime(seconds: number): void;
    toJSON(): any;
    update(videoEvent: IEvents['videoEvent']): void;
    get position(): number;
    get videoLength(): number;
    get status(): VideoStatus;
}

/**
 * @public
 */
declare type Wearable = {
    id: WearableId;
    type: 'wearable';
    category: string;
    baseUrl: string;
    tags: string[];
    representations: BodyShapeRespresentation[];
};

/**
 * @public
 */
declare type WearableId = string;


