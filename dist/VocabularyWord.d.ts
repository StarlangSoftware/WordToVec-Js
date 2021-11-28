import { Word } from "nlptoolkit-dictionary/dist/Dictionary/Word";
export declare class VocabularyWord extends Word {
    private readonly count;
    private readonly code;
    private readonly point;
    static MAX_CODE_LENGTH: number;
    private codeLength;
    /**
     * Constructor for a {@link VocabularyWord}. The constructor gets name and count values and sets the corresponding
     * attributes. It also initializes the code and point arrays for this word.
     * @param name Lemma of the word
     * @param count Number of occurrences of this word in the corpus
     */
    constructor(name: string, count: number);
    /**
     * Accessor for the count attribute.
     * @return Number of occurrences of this word.
     */
    getCount(): number;
    /**
     * Mutator for codeLength attribute.
     * @param codeLength New value for the codeLength.
     */
    setCodeLength(codeLength: number): void;
    /**
     * Mutator for code attribute.
     * @param index Index of the code
     * @param value New value for that indexed element of code.
     */
    setCode(index: number, value: number): void;
    /**
     * Mutator for point attribute.
     * @param index Index of the point
     * @param value New value for that indexed element of point.
     */
    setPoint(index: number, value: number): void;
    /**
     * Accessor for the codeLength attribute.
     * @return Length of the Huffman code for this word.
     */
    getCodeLength(): number;
    /**
     * Accessor for point attribute.
     * @param index Index of the point.
     * @return Value for that indexed element of point.
     */
    getPoint(index: number): number;
    /**
     * Accessor for code attribute.
     * @param index Index of the code.
     * @return Value for that indexed element of code.
     */
    getCode(index: number): number;
}
