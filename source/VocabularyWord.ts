import {Word} from "nlptoolkit-dictionary/dist/Dictionary/Word";

export class VocabularyWord extends Word{

    private readonly count : number;
    private readonly code: Array<number>;
    private readonly point: Array<number>;
    public static MAX_CODE_LENGTH = 40;
    private codeLength: number;

    /**
     * Constructor for a {@link VocabularyWord}. The constructor gets name and count values and sets the corresponding
     * attributes. It also initializes the code and point arrays for this word.
     * @param name Lemma of the word
     * @param count Number of occurrences of this word in the corpus
     */
    constructor(name: string, count: number) {
        super(name);
        this.count = count;
        this.code = new Array<number>(VocabularyWord.MAX_CODE_LENGTH).fill(0);
        this.point = new Array<number>(VocabularyWord.MAX_CODE_LENGTH).fill(0)
        this.codeLength = 0;
    }

    /**
     * Accessor for the count attribute.
     * @return Number of occurrences of this word.
     */
    getCount(): number{
        return this.count
    }

    /**
     * Mutator for codeLength attribute.
     * @param codeLength New value for the codeLength.
     */
    setCodeLength(codeLength: number){
        this.codeLength = codeLength
    }

    /**
     * Mutator for code attribute.
     * @param index Index of the code
     * @param value New value for that indexed element of code.
     */
    setCode(index: number, value: number){
        this.code[index] = value
    }

    /**
     * Mutator for point attribute.
     * @param index Index of the point
     * @param value New value for that indexed element of point.
     */
    setPoint(index: number, value: number){
        this.point[index] = value
    }

    /**
     * Accessor for the codeLength attribute.
     * @return Length of the Huffman code for this word.
     */
    getCodeLength(): number{
        return this.codeLength
    }

    /**
     * Accessor for point attribute.
     * @param index Index of the point.
     * @return Value for that indexed element of point.
     */
    getPoint(index: number): number{
        return this.point[index]
    }

    /**
     * Accessor for code attribute.
     * @param index Index of the code.
     * @return Value for that indexed element of code.
     */
    getCode(index: number): number{
        return this.code[index]
    }
}