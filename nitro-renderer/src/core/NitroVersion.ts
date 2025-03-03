export class NitroVersion {
  public static RENDERER_VERSION: string = "1.6.6";
  public static UI_VERSION: string = "";

  public static sayHello(): void {
    self.console.log(`NitroRP ${NitroVersion.UI_VERSION} - Renderer ${NitroVersion.RENDERER_VERSION} `);
  }
}
