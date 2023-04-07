package method_drill;

public class Practice {

    // (例題)
    static double getTriangleArea(double height, double base) {
        return height * base / 2.0;
    }

    public static void main(String[] args) {
        // (例題) のメソッドの動作検証
        double triangleArea = getTriangleArea(8.2, 4.0);
        System.out.println("三角形の面積は" + triangleArea);
    }

}
