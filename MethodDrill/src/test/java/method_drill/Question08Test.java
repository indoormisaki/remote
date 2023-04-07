package method_drill;

import static org.junit.Assert.*;
import org.junit.Test;

public class Question08Test {

    @Test
    public void test01_平均値を返却する() {
        double[] array = {7.0, 3.0, 5.0};
        double avg = Question08.getAverage(array);
        double expect = (7.0 + 3.0 + 5.0) / 3;
        assertEquals(avg, expect, 0.0);
    }

}
