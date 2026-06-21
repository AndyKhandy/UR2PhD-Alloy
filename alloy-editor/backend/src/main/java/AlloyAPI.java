public class AlloyAPI {
    public static void main(String[] args) {
        String modelText = " sig Person {} run { some Person } for 3 ";
        AlloyRunner runner = new AlloyRunner();
        AlloyResult result  = runner.runModel(modelText);
        System.out.println(result);
    }
}
